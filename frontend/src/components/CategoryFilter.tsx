import { useEffect, useState } from 'react';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5210/Book/GetBookTypes');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({
    target,
  }: {
    target: HTMLInputElement;
  }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div>
      <h5 className='mb-3'>Book Categories</h5>

      {categories.map((c) => (
        <div className='form-check mb-2' key={c}>
          <input
            className='form-check-input'
            type='checkbox'
            id={c}
            value={c}
            checked={selectedCategories.includes(c)}
            onChange={handleCheckboxChange}
          />
          <label className='form-check-label' htmlFor={c}>
            {c}
          </label>
        </div>
      ))}

      {selectedCategories.length > 0 && (
        <button
          className='btn btn-outline-secondary btn-sm mt-3'
          onClick={() => setSelectedCategories([])}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}

export default CategoryFilter;