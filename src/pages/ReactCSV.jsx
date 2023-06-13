import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";

const ReactCSV = () => {
  const headers = [
    { label: "Create At", key: "createat" },
    { label: "Demand Type", key: "demandtype" },
    { label: "Email", key: "email" },
    { label: "Fullname", key: "fullname" },
    { label: "ID", key: "id" },
    { label: "Message", key: "message" },
    { label: "Note By Admin", key: "notebyadmin" },
    { label: "Phone Number", key: "phonenumber" },
    { label: "Processing Status", key: "processingstt" },
    { label: "Update At", key: "updateat" },
  ];

  const [contactsList, setContactsList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(
          "http://localhost:3333/contacts/allcontacts"
        );
        setContactsList(data.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  console.log(contactsList);

  return (
    <div>
      <CSVLink
        data={contactsList}
        headers={headers}
        filename="ContactList.csv"
        target="_blank"
      >
        Export
      </CSVLink>
    </div>
  );
};

export default ReactCSV;
