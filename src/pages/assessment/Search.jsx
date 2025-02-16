import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Search = ({ studentsData, setFilteredStudents, setHighlightTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [idMap, setIdMap] = useState(new Map());

  // Build index for efficient searching
  useEffect(() => {
    const idMapTemp = new Map();
    studentsData.forEach((student) => {
      idMapTemp.set(student.student_id.toString(), student);
    });
    setIdMap(idMapTemp);
  }, [studentsData]);

  // Debounced Search Logic
  useEffect(() => {
    const handler = setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();
      setHighlightTerm(term); // Pass the search term to highlight

      if (term === "") {
        setFilteredStudents(studentsData); // Show all when input is empty
      } else if (idMap.has(term)) {
        setFilteredStudents([idMap.get(term)]);
      } else {
        const nameMatches = studentsData.filter((student) =>
          student.student_name.toLowerCase().includes(term)
        );
        setFilteredStudents(nameMatches);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchTerm, studentsData, idMap, setFilteredStudents, setHighlightTerm]);

  return (
    <input
      className="sts-search"
      type="text"
      placeholder="Enter ID or Name"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

Search.propTypes = {
  studentsData: PropTypes.array.isRequired,
  setFilteredStudents: PropTypes.func.isRequired,
  setHighlightTerm: PropTypes.func.isRequired,
};

export default Search;
