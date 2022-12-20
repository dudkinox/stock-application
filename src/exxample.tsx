import * as React from "react";

// mport { InputGroup, FormControl, ListGroup } from 'react-bootstrap';

// function IDCardInput() {
//   const [value, setValue] = useState('');
//   const [options, setOptions] = useState([]);
//   const [showOptions, setShowOptions] = useState(false);

//   useEffect(() => {
//     async function fetchOptions() {
//       const response = await fetch(`/api/idcards?query=${value}`);
//       const data = await response.json();
//       setOptions(data);
//     }

//     if (value.length > 2) {
//       fetchOptions();
//       setShowOptions(true);
//     } else {
//       setShowOptions(false);
//     }
//   }, [value]);

//   return (
//     <InputGroup className="mb-3">
//       <FormControl
//         placeholder="Enter ID card number"
//         aria-label="ID card number"
//         aria-describedby="basic-addon2"
//         value={value}
//         onChange={(event) => setValue(event.target.value)}
//       />
//       <InputGroup.Append>
//         <InputGroup.Text id="basic-addon2">Options</InputGroup.Text>
//       </InputGroup.Append>
//       {showOptions && (
//         <ListGroup className="
