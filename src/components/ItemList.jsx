import EmptyView from './EmptyView';
import Select from 'react-select';
import { useMemo, useState } from 'react';
import { useItemsStore } from '../stores/itemsStore';

const sortingOptions = [
  {
    label: 'Sort by default',
    value: 'default',
  },
  {
    label: 'Sort by packed',
    value: 'packed',
  },
  {
    label: 'Sort by unpacked',
    value: 'unpacked',
  },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState('default');
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItem = useItemsStore((state) => state.toggleItem);

  //spread the items into a new array in order to avoid mutating the original array
  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === 'packed') {
          return b.packed - a.packed;
        }
        if (sortBy === 'unpacked') {
          return a.packed - b.packed;
        }
        return;
      }),
    [items, sortBy]
  );

  return (
    <ul className='item-list'>
      {items.length === 0 ? <EmptyView /> : null}
      {items.length > 0 ? (
        <section className='sorting'>
          <Select
            onChange={(option) => {
              setSortBy(option.value);
            }}
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      ) : null}
      {sortedItems.map((item) => (
        <Item
          item={item}
          key={item.id}
          deleteItem={deleteItem}
          toggleItem={toggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, deleteItem, toggleItem }) {
  return (
    <li className='item'>
      <label>
        <input
          onChange={() => {
            toggleItem(item.id);
          }}
          type='checkbox'
          checked={item.packed}
        />
        {item.name}
      </label>
      <button
        onClick={() => {
          deleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
