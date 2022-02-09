import { useState } from 'react'

const useFilterBySearch = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return {
        searchTerm,
        handleSearchChange
    }
}

export default useFilterBySearch
