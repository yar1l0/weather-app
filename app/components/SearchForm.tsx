import { useState } from 'react';
import { TextInput, Button, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

interface SearchFormProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Group>
        <TextInput
          placeholder="Enter city name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flexGrow: 1 }}
          data-testid="city-input"
          required
        />
        <Button 
          type="submit" 
          loading={isLoading}
          leftIcon={<IconSearch size={16} />}
          data-testid="search-button"
        >
          Search
        </Button>
      </Group>
    </form>
  );
};

export default SearchForm;