import { useState, useEffect } from "react";

export default function HomePage({ selectedCategory }) {
  const [itemInfo, setItemInfo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4001/items")
      .then((response) => {
        response.json().then((itemInfo) => {
          setItemInfo(itemInfo);
        });
      });
  }, []);

  if (!itemInfo) return '';

  const filteredItems = selectedCategory === "all"
  ? itemInfo
  : itemInfo.filter((item) => item.item.toLowerCase().includes(selectedCategory.toLowerCase()));


  return (
    <ul>
      {filteredItems.map((each) => (
        <li key={each.itemName} className="card">
          <img alt="item" src={"http://localhost:4001/" + each.cover} />
          <h3>Item: {each.item}</h3>
          <p>{each.description}</p>
          <p>Availability: Yes</p>
          <p>Contact: {each.content}</p>
        </li>
      ))}
    </ul>
  );
}
