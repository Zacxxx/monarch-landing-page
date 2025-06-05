import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

const TILE_SIZE = 20; // px
const HOVER_BORDER_WIDTH = '2px';
const HOVER_TILE_COLOR = 'hsl(var(--accent)/0.7)';
const HOVER_BORDER_COLOR = 'hsl(var(--border))'; 

const WAVE_PROPAGATION_DELAY = 30; // ms
const WAVE_MAX_RADIUS = 8; 

const waveColors = [
  'hsl(var(--primary))',
  'hsl(var(--accent))',
  'hsl(var(--destructive))',
  'hsl(35, 100%, 58%)', // Orange
  'hsl(300, 76%, 72%)', // Lavender
  'hsl(120, 60%, 50%)', // Green
];

const apotheosisColors = [
    'hsl(var(--primary)/0.9)',
    'hsl(var(--accent)/0.9)',
    'hsl(var(--destructive)/0.8)',
    'hsl(0, 0%, 100%)', // White
    'hsl(50, 100%, 50%)', // Yellow
];

const idleChars = ['Δ', 'Σ', 'λ', '0', '1', '◇', '◆', '✧', '❖', '{}', '://', 'EXE', 'RUN', 'AI', 'M'];
const idleFlashColors = [
    'hsl(var(--primary)/0.6)', 
    'hsl(var(--accent)/0.6)', 
    'hsl(var(--destructive)/0.5)'
];

const APOTHEOSIS_DURATION_MS = 3000; // 3 seconds

const getRandomArrayElement = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

interface HSLColor { h: number; s: number; l: number; }
interface HSLAColor extends HSLColor { a: number; }

const parseHslString = (hslString: string): HSLAColor | null => {
  const hslRegex = /hsla?\(\s*(\d+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)/;
  const match = hslString.match(hslRegex);
  if (match) {
    return {
      h: parseInt(match[1], 10),
      s: parseFloat(match[2]),
      l: parseFloat(match[3]),
      a: match[4] !== undefined ? parseFloat(match[4]) : 1,
    };
  }
  return null;
};

const toHslaString = (hsla: HSLAColor): string => `hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`;

type IdleAnimationType = 'none' | 'flash' | 'char' | 'pulse';
interface IdleState {
  type: IdleAnimationType;
  char?: string;
  color?: string;
  opacity?: number;
  duration: number; 
  progress: number; 
}

interface ApotheosisState {
  color: string; 
  progressRatio: number; 
  char?: string;
}

interface TileData {
  id: string;
  row: number;
  col: number;
  currentColor: string | null;
  isHovered: boolean;
  idle: IdleState;
  apotheosisState?: ApotheosisState;
}

interface InteractiveGridBackgroundProps {
  triggerApotheosis?: number; 
}

// Debounce function for resize events
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const InteractiveGridBackground: React.FC<InteractiveGridBackgroundProps> = ({ triggerApotheosis = 0 }) => {
  const [grid, setGrid] = useState<TileData[][]>([]);
  const [waveOrigin, setWaveOrigin] = useState<{ row: number; col: number; startColor: string } | null>(null);
  const [currentWaveRadius, setCurrentWaveRadius] = useState(0);
  const [isApotheosisActive, setIsApotheosisActive] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const idleAnimationIdRef = useRef<number>();
  const waveTimeoutIdRef = useRef<NodeJS.Timeout>();
  const waveAnimationIdRef = useRef<number>(); 
  const apotheosisAnimationIdRef = useRef<number>();
  const apotheosisStartTimeRef = useRef<number>(0);
  const gridDimensionsRef = useRef<{ numRows: number; numCols: number }>({ numRows: 0, numCols: 0 });

  // Memoized grid dimensions calculation
  const calculateGridDimensions = useCallback(() => {
    if (!containerRef.current) return { numRows: 0, numCols: 0 };
    const { width, height } = containerRef.current.getBoundingClientRect();
    return {
      numCols: Math.ceil(width / TILE_SIZE),
      numRows: Math.ceil(height / TILE_SIZE)
    };
  }, []);

  const initializeGrid = useCallback(() => {
    const dimensions = calculateGridDimensions();
    if (dimensions.numRows === 0 || dimensions.numCols === 0) return;
    
    // Only recreate grid if dimensions changed
    if (gridDimensionsRef.current.numRows === dimensions.numRows && 
        gridDimensionsRef.current.numCols === dimensions.numCols) {
      return;
    }
    
    gridDimensionsRef.current = dimensions;
    
    const newGrid: TileData[][] = Array.from({ length: dimensions.numRows }, (_, r) =>
      Array.from({ length: dimensions.numCols }, (_, c) => ({
        id: `tile-${r}-${c}`,
        row: r,
        col: c,
        currentColor: null,
        isHovered: false,
        idle: { type: 'none', progress: 0, duration: 0 },
      }))
    );
    setGrid(newGrid);
  }, [calculateGridDimensions]);

  // Debounced resize handler
  const debouncedInitializeGrid = useMemo(
    () => debounce(initializeGrid, 150),
    [initializeGrid]
  );

  useEffect(() => {
    initializeGrid();
    window.addEventListener('resize', debouncedInitializeGrid);
    return () => {
      window.removeEventListener('resize', debouncedInitializeGrid);
      if (idleAnimationIdRef.current) cancelAnimationFrame(idleAnimationIdRef.current);
      if (waveTimeoutIdRef.current) clearTimeout(waveTimeoutIdRef.current);
      if (waveAnimationIdRef.current) cancelAnimationFrame(waveAnimationIdRef.current);
      if (apotheosisAnimationIdRef.current) cancelAnimationFrame(apotheosisAnimationIdRef.current);
    }
  }, [initializeGrid, debouncedInitializeGrid]);

  // Optimized apotheosis effect
  useEffect(() => {
    if (triggerApotheosis > 0 && !isApotheosisActive) { 
        setIsApotheosisActive(true);
        
        // Clean up existing animations
        if (waveTimeoutIdRef.current) clearTimeout(waveTimeoutIdRef.current);
        if (waveAnimationIdRef.current) cancelAnimationFrame(waveAnimationIdRef.current);
        setWaveOrigin(null);
        
        // Clear grid more efficiently
        setGrid(prevGrid => prevGrid.map(row => 
          row.map(tile => ({ ...tile, currentColor: null }))
        ));

        apotheosisStartTimeRef.current = performance.now();

        const animateApotheosis = (currentTime: DOMHighResTimeStamp) => {
            const elapsedTime = currentTime - apotheosisStartTimeRef.current;
            
            if (elapsedTime >= APOTHEOSIS_DURATION_MS) {
                setIsApotheosisActive(false);
                setGrid(prevGrid => prevGrid.map(row => 
                  row.map(tile => ({ ...tile, apotheosisState: undefined, currentColor: null }))
                ));
                return;
            }

            const progressRatio = elapsedTime / APOTHEOSIS_DURATION_MS;

            setGrid(prevGrid => prevGrid.map(rowTiles => rowTiles.map(tile => {
                const isCenterPiece = Math.random() < progressRatio * 0.1; 
                const randomColor = getRandomArrayElement(apotheosisColors);
                const char = isCenterPiece ? 'M' : (Math.random() < 0.3 ? getRandomArrayElement(idleChars) : undefined);
                
                let tileColor = tile.apotheosisState?.color || null;
                if (Math.random() < 0.15) { 
                    tileColor = randomColor;
                }

                return { 
                    ...tile, 
                    apotheosisState: { 
                        color: tileColor || randomColor,
                        progressRatio: progressRatio,
                        char: char,
                    }
                };
            })));

            apotheosisAnimationIdRef.current = requestAnimationFrame(animateApotheosis);
        };
        apotheosisAnimationIdRef.current = requestAnimationFrame(animateApotheosis);
    }
  }, [triggerApotheosis, isApotheosisActive]);

  // Optimized idle animations with reduced frequency
  useEffect(() => {
    if (isApotheosisActive) { 
        if(idleAnimationIdRef.current) cancelAnimationFrame(idleAnimationIdRef.current);
        return;
    }

    let frameCount = 0;
    const updateIdleAnimations = () => {
      frameCount++;
      // Reduce update frequency for better performance
      if (frameCount % 2 !== 0) {
        idleAnimationIdRef.current = requestAnimationFrame(updateIdleAnimations);
        return;
      }

      setGrid(prevGrid => {
        if (!prevGrid.length) return prevGrid;
        
        // Only update tiles that need updating
        let hasChanges = false;
        const newGrid = prevGrid.map(row => row.map(tile => {
          let newIdle = { ...tile.idle };

          if (newIdle.progress >= newIdle.duration && newIdle.type !== 'none') {
            newIdle = { type: 'none', progress: 0, duration: 0 }; 
            hasChanges = true;
          }
          
          if (newIdle.type === 'none' && Math.random() < 0.0003) { // Reduced frequency
            const randType = Math.random();
            if (randType < 0.4) { 
              newIdle = { 
                type: 'flash', 
                color: getRandomArrayElement(idleFlashColors), 
                duration: 5 + Math.random() * 15, 
                progress: 0 
              };
            } else if (randType < 0.7) { 
              newIdle = { 
                type: 'char', 
                char: getRandomArrayElement(idleChars), 
                color: `hsl(var(--foreground)/${0.6 + Math.random() * 0.3})`,
                duration: 20 + Math.random() * 40, 
                progress: 0 
              };
            } else { 
              newIdle = {
                type: 'pulse',
                color: `hsl(var(--primary)/${0.03 + Math.random() * 0.07})`, 
                duration: 40 + Math.random() * 80,
                progress: 0,
              }
            }
            hasChanges = true;
          } else if (newIdle.type !== 'none') {
            newIdle.progress = newIdle.progress + 1;
            hasChanges = true;
          }
          
          return newIdle !== tile.idle ? { ...tile, idle: newIdle } : tile;
        }));
        
        return hasChanges ? newGrid : prevGrid;
      });
      idleAnimationIdRef.current = requestAnimationFrame(updateIdleAnimations);
    };

    idleAnimationIdRef.current = requestAnimationFrame(updateIdleAnimations);
    return () => {
      if (idleAnimationIdRef.current) {
        cancelAnimationFrame(idleAnimationIdRef.current);
      }
    };
  }, [isApotheosisActive]); 

  const handleTileClick = useCallback((row: number, col: number) => {
    if (isApotheosisActive) return; 

    setGrid(prevGrid => prevGrid.map(rowTiles => 
      rowTiles.map(tile => ({ ...tile, currentColor: null }))
    ));

    const clickedTile = grid[row]?.[col];
    const startColor = clickedTile?.isHovered ? HOVER_TILE_COLOR : getRandomArrayElement(waveColors);
    
    if (waveTimeoutIdRef.current) clearTimeout(waveTimeoutIdRef.current);
    if (waveAnimationIdRef.current) cancelAnimationFrame(waveAnimationIdRef.current);

    setWaveOrigin({ row, col, startColor });
    setCurrentWaveRadius(0); 
  }, [grid, isApotheosisActive]);
  
  const handleTileHover = useCallback((row: number, col: number, isHovering: boolean) => {
    if (isApotheosisActive) return; 
    setGrid(prevGrid => {
      if (!prevGrid[row] || !prevGrid[row][col]) return prevGrid;
      
      const currentTile = prevGrid[row][col];
      if (currentTile.isHovered === isHovering) return prevGrid; // No change needed
      
      const newGrid = prevGrid.map(rowTiles => rowTiles.map(tile => ({ ...tile })));
      newGrid[row][col].isHovered = isHovering;
      
      if (isHovering) {
        if (newGrid[row][col].idle.type === 'none' || newGrid[row][col].idle.type === 'pulse') {
            newGrid[row][col].idle = { type: 'pulse', color: `hsl(var(--accent)/0.15)`, duration: 10, progress: 0 };
        }
      } else {
         if (newGrid[row][col].idle.type === 'pulse' && newGrid[row][col].idle.color === `hsl(var(--accent)/0.15)`) {
            newGrid[row][col].idle = { type: 'none', duration: 0, progress: 0 };
        }
      }
      return newGrid;
    });
  }, [isApotheosisActive]);

  // Optimized wave propagation
  useEffect(() => {
    if (!waveOrigin || isApotheosisActive) { 
        if(waveAnimationIdRef.current) cancelAnimationFrame(waveAnimationIdRef.current);
        return;
    }

    const propagate = () => {
      if (currentWaveRadius > WAVE_MAX_RADIUS) {
        setWaveOrigin(null); 
        setGrid(prevGrid => prevGrid.map(rowTiles => 
          rowTiles.map(tile => ({ ...tile, currentColor: null }))
        )); 
        return;
      }

      const baseColorParts = parseHslString(waveOrigin.startColor);
      if (!baseColorParts) {
        setWaveOrigin(null);
        return;
      }

      setGrid(prevGrid =>
        prevGrid.map(rowTiles =>
          rowTiles.map(tile => {
            const distance = Math.sqrt(Math.pow(tile.row - waveOrigin.row, 2) + Math.pow(tile.col - waveOrigin.col, 2));
            if (Math.floor(distance) === currentWaveRadius) {
              const propagationFactor = Math.max(0, 1 - (currentWaveRadius / (WAVE_MAX_RADIUS + 1))); 
              const waveAlpha = baseColorParts.a * propagationFactor;
              const newTileColor = toHslaString({...baseColorParts, a: Math.max(0.1, waveAlpha) }); 
              return { ...tile, currentColor: newTileColor };
            }
            return tile;
          })
        )
      );
      setCurrentWaveRadius(prev => prev + 1);
      waveAnimationIdRef.current = requestAnimationFrame(propagate);
    };
    
    waveTimeoutIdRef.current = setTimeout(() => {
        waveAnimationIdRef.current = requestAnimationFrame(propagate);
    }, WAVE_PROPAGATION_DELAY);

    return () => { 
      if (waveAnimationIdRef.current) cancelAnimationFrame(waveAnimationIdRef.current);
      if (waveTimeoutIdRef.current) clearTimeout(waveTimeoutIdRef.current);
    };
  }, [waveOrigin, currentWaveRadius, isApotheosisActive]); 

  // Memoized grid rendering to reduce re-renders
  const gridElements = useMemo(() => {
    return grid.flat().map((tile) => {
        let backgroundColor = 'transparent';
        let borderColor = 'hsl(var(--border)/0.1)'; 
        let currentBorderWidth = '1px';
        let charContent: string | undefined = undefined;
        let charOpacity = 0;
        let charColor = 'hsl(var(--foreground)/0.7)';

        if (isApotheosisActive && tile.apotheosisState) {
            backgroundColor = tile.apotheosisState.color;
            charContent = tile.apotheosisState.char;
            charColor = getRandomArrayElement(apotheosisColors); 
            charOpacity = tile.apotheosisState.char ? 0.9 : 0;
            borderColor = getRandomArrayElement(apotheosisColors.map(c => parseHslString(c) ? toHslaString({...parseHslString(c)!, a:0.5}) : HOVER_BORDER_COLOR));
            currentBorderWidth = Math.random() < 0.5 ? '1px' : '2px';
        } else {
            if (tile.currentColor) {
              backgroundColor = tile.currentColor;
            } else if (tile.isHovered) {
              backgroundColor = HOVER_TILE_COLOR;
            } else if (tile.idle.type === 'pulse' && tile.idle.color) {
              backgroundColor = tile.idle.color;
            } else if (tile.idle.type === 'flash' && tile.idle.color && tile.idle.progress < tile.idle.duration) {
               const flashProgress = tile.idle.progress / tile.idle.duration;
               const opacity = Math.sin(flashProgress * Math.PI); 
               const flashBaseColor = parseHslString(tile.idle.color);
               if(flashBaseColor) {
                backgroundColor = toHslaString({...flashBaseColor, a: flashBaseColor.a * opacity});
               }
            }

            if (tile.isHovered) {
              borderColor = HOVER_BORDER_COLOR;
              currentBorderWidth = HOVER_BORDER_WIDTH;
            }

            if (tile.idle.type === 'char' && tile.idle.char && tile.idle.progress < tile.idle.duration) {
               const charProgress = tile.idle.progress / tile.idle.duration;
               charOpacity = Math.sin(charProgress * Math.PI) * 0.9; 
               if(tile.idle.color) charColor = tile.idle.color;
               charContent = tile.idle.char;
            }
        }

        return (
          <div
            key={tile.id}
            className="flex items-center justify-center transition-colors duration-100 ease-in-out" 
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              backgroundColor,
              border: `${currentBorderWidth} solid ${borderColor}`,
              boxSizing: 'border-box',
              fontSize: `${TILE_SIZE * 0.6}px`, 
              lineHeight: '1',
              color: charColor,
              userSelect: 'none',
              transitionProperty: 'background-color, border-color, color', 
            }}
            onMouseEnter={() => handleTileHover(tile.row, tile.col, true)}
            onMouseLeave={() => handleTileHover(tile.row, tile.col, false)}
            onClick={() => handleTileClick(tile.row, tile.col)}
          >
            {charContent && 
              <span style={{ opacity: charOpacity, transition: 'opacity 0.05s linear' }}>
                {charContent}
              </span>
            }
          </div>
        );
      });
  }, [grid, isApotheosisActive, handleTileHover, handleTileClick]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 grid overflow-hidden z-[-10]" 
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${TILE_SIZE}px, 1fr))`,
        gridTemplateRows: `repeat(auto-fill, minmax(${TILE_SIZE}px, 1fr))`,
      }}
    >
      {gridElements}
    </div>
  );
};

export default InteractiveGridBackground;
