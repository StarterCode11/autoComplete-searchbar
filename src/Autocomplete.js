import { useState, useEffect, useRef } from "react";
const cityNames = [
  "Amsterdam",
  "Berlin",
  "London",
  "New York",
  "Paris",
  "Rome",
  "San Francisco",
  "Tokyo",
  "Washington DC",
  "Zurich",
  "Copenhagen",
  "Helsinki",
  "Madrid",
  "Reykjavik",
  "Stockholm",
  "Vancouver",
  "Vienna",
  "Zagreb",
  "Budapest",
  "Dublin",
  "Hamburg",
  "Krakow",
  "Lisbon",
  "Ljubljana",
  "Delhi",
  "Bhubaneswar",
  "Bangalore",
  "Chennai",
  "Gandhinagar",
  "patna",
  "Chandigarh",
  "Lucknow",
  "Bhopal",
  "Kolkata",
  "thiruvantapuram",
];

const Autocomplete = () => {
  const [data] = useState(cityNames);
  const [filterData, setFilterData] = useState(cityNames);
  const [value, setValue] = useState("");
  const autocompleteRef = useRef(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const debounce = function (fn) {
    let timer;
    return function (...args) {
      if (timer) clearTimeout(timer);
      let context = this;
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (value) => {
    setValue(value);
    const optimise = debounce(fun);
    optimise(value);
  };

  const fun = (value) => {
    const filterData = data.filter((Item) =>
      Item.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filterData);
  };

  const handleClick = () => {
    setValue(value);
    setShow(false);
  };
  return (
    <>
      <div className="autocomplete" ref={autocompleteRef}>
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type to search"
          onFocus={() => setShow(true)}
        />
        {show && (
          <ul>
            {filterData.map((row) => {
              return <li onClick={() => handleClick(row)}>{row}</li>;
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Autocomplete;
