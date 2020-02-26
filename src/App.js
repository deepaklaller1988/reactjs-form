import React, { useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-responsive-modal';
import '../node_modules/font-awesome/css/font-awesome.css'


// main function
function App() {

  // form variables
  const [selectedValue, setSelectedValue] = React.useState('1');
  const [addrtype, setAddrtype] = useState(["Short Reports", "Annual Reports", "Presentations"])
  const [startDate, setStartDate] = React.useState(new Date());
  const [notes, setNotes] = React.useState("")
  const [isLoaded, setIsLoaded] = React.useState(false);
  //const [isModalopen, setModal] = React.useState(false);
  const Add = addrtype.map(Add => Add)




  // Radio function
  const handleChange = event => {
    setSelectedValue(event.target.value);
    if (event.target.value == "1") {
      setAddrtype(["Short Reports", "Annual Reports", "Presentations"])

    } else if (event.target.value == "2") {
      setAddrtype(['Poetry', 'Short Stories', 'Drama'])
    } else {
      setAddrtype(['Web Development', 'Desktop Software Development', 'Research and Analysis'])
    }

  }


  // On submit form
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (notes != "") {
      if (notes.length >= 20) {
        if (notes.length <= 500) {
          setIsLoaded(true);
          setTimeout(() => {
            setIsLoaded(false);
            //setModal(true);
            alert('Your course has been successfully registered')

          }, 3000);
        } else {
          //alert('You can write max 500 words')
        }
      } else {
        alert('Please Write at least 20 words')
      }
    } else if (notes.length == "") {
      setIsLoaded(true);
      setTimeout(() => {
        setIsLoaded(false);
        alert('Your course has been successfully registered');
        //setModal(true);
      }, 3000);

    }
  }

  // Date Validation 
  const PickDate = (ev) => {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let formatted_date = ev.getDate() + " " + months[ev.getMonth()] + "," + ev.getFullYear()

    if (formatted_date === "20 DEC,2019" || formatted_date === "15 JAN,2020" || formatted_date === "1 FEB,2020") {
      setStartDate(ev)
    } else {
      alert('Your selected course and subject is not offered beginning from your selected date')
    }
  }

  // Select Dropdown
  const handleAddrTypeChange = (e) => { console.log((addrtype[e.target.value])) }

  const checked = (e) => { setNotes(e.target.value); }

  //
  // const closeModal = () => {
  //   setModal(false);
  // }

  // JSX  
  return (
    <div className="App">
      <form onSubmit={handleSubmit} id="course-form">
        <label className="label-names">Course : </label>
        <span><label><input type="radio" value="1" checked={selectedValue === '1'} onChange={handleChange} required />Technical Report Writing</label></span>
        <span><label><input type="radio" value="2" checked={selectedValue === '2'} onChange={handleChange} required />English Literature</label></span>
        <span><label><input type="radio" value="3" checked={selectedValue === '3'} onChange={handleChange} required />Computer Sciences</label></span>

{/* Display dropdown */}
        < select
          onChange={e => handleAddrTypeChange(e)}
          className="browser-default custom-select" required >
          {
            Add.map((address, key) => <option key={key} value={key}>{address}</option>)
          }
        </select >

{/* Date Picker */}
        <DatePicker selected={startDate} onChange={PickDate} />
{/* Notes */}
      <textarea placeholder="Write Something...." rows="3" onChange={checked}></textarea>

 {/* Submit buttons */}
        {
          isLoaded &&
          <button type="submit" className="button">
            <i className="fa fa-spinner fa-spin"></i>Loading...
          </button>
        }
        {
          !isLoaded &&
          <button type="submit" className="button">
            Submit
          </button>
        }

        {/* Success Modal */}
        {/* <Modal open={isModalopen} onClose={closeModal} center>
          <h2>Your course has been successfully registered</h2>
        </Modal> */}
      </form>
    </div>
  );
}

export default App;
