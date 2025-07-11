// src/App.js
import React, { useState } from 'react';
import './App.css';

const initialClasses = [
  { id: 1, name: 'Lớp A' },
  { id: 2, name: 'Lớp B' },
  { id: 3, name: 'Lớp C' },
];

const initialStudents = [
  { id: 1, name: 'An', age: 18, classId: 1, score: 9.2 },
  { id: 2, name: 'Bình', age: 17, classId: 1, score: 8.5 },
  { id: 3, name: 'Cường', age: 19, classId: 1, score: 7.0 },
  { id: 4, name: 'Dũng', age: 18, classId: 2, score: 9.5 },
  { id: 5, name: 'Em', age: 18, classId: 2, score: 9.0 },
  { id: 6, name: 'Phúc', age: 17, classId: 2, score: 6.5 },
  { id: 7, name: 'Giang', age: 17, classId: 3, score: 8.0 },
  { id: 8, name: 'Hiếu', age: 18, classId: 3, score: 5.5 },
  { id: 9, name: 'Khoa', age: 17, classId: 3, score: 7.5 },
  { id: 10, name: 'Lan', age: 18, classId: 3, score: 9.8 },
];

function App() {
  const [classes, setClasses] = useState(initialClasses);
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('');

  const addClass = () => {
    const name = prompt('Tên lớp mới:');
    if (name) {
      setClasses([...classes, { id: Date.now(), name }]);
    }
  };

  const deleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
    setStudents(students.filter(s => s.classId !== id));
  };

  const addStudent = () => {
    const name = prompt('Tên học sinh:');
    const age = parseInt(prompt('Tuổi:'), 10);
    const score = parseFloat(prompt('Điểm:'));
    const classId = parseInt(prompt('ID lớp:'), 10);
    if (name && !isNaN(age) && !isNaN(score) && classId) {
      setStudents([...students, { id: Date.now(), name, age, score, classId }]);
    }
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const top3 = () => {
    return [...students].sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const sortStudents = (type) => {
    const sorted = [...students].sort((a, b) => type === 'asc' ? a.score - b.score : b.score - a.score);
    setStudents(sorted);
  };

  const sortClassesBySize = () => {
    const sorted = [...classes].sort((a, b) => {
      const countA = students.filter(s => s.classId === a.id).length;
      const countB = students.filter(s => s.classId === b.id).length;
      return countB - countA;
    });
    setClasses(sorted);
  };

  const filteredStudents = students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterClass === '' || s.classId === parseInt(filterClass))
  );

  return (
      <div className="container">
        <h1>Quản lý lớp học & học sinh</h1>

        <div className="actions">
          <button onClick={addClass}>Thêm lớp</button>
          <button onClick={addStudent}>Thêm học sinh</button>
          <button onClick={() => sortStudents('asc')}>Sắp xếp điểm tăng</button>
          <button onClick={() => sortStudents('desc')}>Sắp xếp điểm giảm</button>
          <button onClick={sortClassesBySize}>Sắp xếp lớp theo số học sinh</button>
        </div>

        <div className="filter">
          <input placeholder="Tìm học sinh..." onChange={e => setSearch(e.target.value)} />
          <select onChange={e => setFilterClass(e.target.value)}>
            <option value=''>-- Tất cả lớp --</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="list-container">
          <div className="card">
            <h2>Danh sách lớp</h2>
            <ul>
              {classes.map(cls => (
                  <li key={cls.id}>{cls.name} <button onClick={() => deleteClass(cls.id)}>Xóa</button></li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2>Danh sách học sinh</h2>
            <ul>
              {filteredStudents.map(s => (
                  <li key={s.id}>
                    {s.name} ({s.age} tuổi) - Lớp {classes.find(c => c.id === s.classId)?.name} - {s.score} điểm
                    <button onClick={() => deleteStudent(s.id)}>Xóa</button>
                  </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h2>Top 3 học sinh điểm cao</h2>
            <ol>
              {top3().map(s => (
                  <li key={s.id}>{s.name} - {s.score} điểm</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
  );
}

export default App;
