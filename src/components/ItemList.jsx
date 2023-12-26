import EmptyView from './EmptyView';

export default function ItemList({
  items,
  handleDeleteItem,
  handleToggleItem,
}) {
  return (
    <ul className='item-list'>
      {items.length === 0 ? <EmptyView /> : null}
      {items.map((item) => (
        <Item
          item={item}
          key={item.id}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handleToggleItem}
        />
      ))}
    </ul>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className='item'>
      <label>
        <input
          onChange={() => {
            onToggleItem(item.id);
          }}
          type='checkbox'
          checked={item.packed}
        />
        {item.name}
      </label>
      <button
        onClick={() => {
          onDeleteItem(item.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
