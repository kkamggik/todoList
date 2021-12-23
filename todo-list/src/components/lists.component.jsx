import React, { useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

const List = (props) => (
    <tr>
        <td>{props.list.description}</td>
        <td>{props.list.date.substring(0,10)}</td>
        <td><a href="#" onClick= {() => {props.deleteList(props.list._id)}}>delete</a></td>
    </tr>
)

export default function Lists(props) {
    const navigate = useNavigate();
    const [lists, setLists] = React.useState([]);
    const [description, setDescription] = React.useState('');
    const [date, setDate] = React.useState(new Date());


    useEffect(() => {
        axios.get('http://localhost:5000/lists/')
        .then((res) => {
            setLists(res.data);
        })
        .catch((err) => console.log(err));
    }, [lists]);

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleDate = (date) => {
        setDate(date);
    }

    const deleteList = (id) => {
        axios.delete('http://localhost:5000/lists/'+id)
        .then((res) => console.log(res.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const list = {
            description: description,
            date: date
        }
        axios.post('http://localhost:5000/lists/add', list)
        .then((res) => console.log(res.data))
        setDescription('');
        setDate(new Date());
        navigate("/");
    }
    const ViewList = () => {
        return lists.map((list) => {
            return <List list={list} deleteList={deleteList} key={list._id}/>
        });
    }

    return (
        <div>
            <h5>Add New List</h5>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={handleDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={handleDate}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit" value="Add" className="btn btn-primary" />
                </div>
            </form>
            <br/>
            <h3>to do List</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ViewList()}
                </tbody>
            </table>
        </div>
    )
}