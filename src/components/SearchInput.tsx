
import React, { useState, useEffect, useRef } from 'react';
import { Fighter } from '../data/fighters';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGameContext } from '../context/GameContext';

interface SearchInputProps {
  fighters: Fighter[];
  onSelectFighter: (fighter: Fighter) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ fighters, onSelectFighter }) => {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredFighters, setFilteredFighters] = useState<Fighter[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { gameState } = useGameContext();
  const { isGameOver } = gameState;

  useEffect(() => {
    if (query.trim() === '') {
      setFilteredFighters([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = fighters
      .filter(fighter => fighter.name.toLowerCase().includes(lowercaseQuery))
      .slice(0, 8); // Limit to 8 results for performance
    
    setFilteredFighters(filtered);
  }, [query, fighters]);

  useEffect(() => {
    // Handle clicks outside of the dropdown to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) && 
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleSelectFighter = (fighter: Fighter) => {
    onSelectFighter(fighter);
    setQuery('');
    setShowDropdown(false);
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for a UFC fighter..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setShowDropdown(true)}
          disabled={isGameOver}
          className="pr-10"
        />
        {query ? (
          <Button 
            variant="ghost" 
            size="icon"
            className="absolute right-0 top-0 h-10 w-10" 
            onClick={clearSearch}
          >
            <X size={18} />
          </Button>
        ) : (
          <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
        )}
      </div>
      
      {showDropdown && filteredFighters.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-background border border-border rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          <ul>
            {filteredFighters.map((fighter) => (
              <li 
                key={fighter.id}
                className="px-4 py-2 hover:bg-muted cursor-pointer text-sm"
                onClick={() => handleSelectFighter(fighter)}
              >
                <div className="font-medium">{fighter.name}</div>
                <div className="text-xs text-muted-foreground">
                  {fighter.division} • {fighter.country}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
