import React, { useEffect, useState } from 'react'
import '../../../../App.css'
import '../../../../Styles/Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faSort, faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames'

export default function DashboardNewsTable(props) {

    const [news, setNews] = useState([])
    // const [searchInput, setSearchInput] = useState("")
    // const [isSortByName, setIsSortByName] = useState(false)
    // const [isSortByPrice, setIsSortByPrice] = useState(false)
    // const [isSortBySale, setIsSortBySale] = useState(false)
    // const [isSortBySold, setIsSortBySold] = useState(false)
    
    useEffect(()=>{
        axios.get(`http://localhost:4000/news`)
            .then(res => {
                setNews(res.data)
            }
        )
    },[props.isChange]) 

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const choosePage = (event) => {
        if (Number(event.target.id) === 0) {
            setCurrentPage(currentPage)
        } else if (Number(event.target.id) === -1) {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            } else {
                setCurrentPage(1);
            }
        } else if (Number(event.target.id) === 999) {
            setCurrentPage(currentPage + 1)
        } else {
            setCurrentPage(Number(event.target.id))
        }
    }

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const current = news.slice(indexOfFirst, indexOfLast);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(news.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const pages = [];

    if (currentPage === 2) {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
    } else {
        if (currentPage === 1) {
            pages.push(currentPage, currentPage + 1, currentPage + 2 );
        } else if (currentPage === 2) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else if (currentPage > 2 && currentPage < pageNumbers.length - 1) {
            pages.push(currentPage -1, currentPage, currentPage + 1);
        } else if (currentPage === pageNumbers.length - 1) {
            pages.push(currentPage - 1, currentPage, currentPage + 1);
        } else {
            pages.push(currentPage - 2, currentPage - 1, currentPage);
        }
    }

    // const deleteOnClick = (event) => {
    //     axios.post(`http://localhost:4000/products/delete/:${event.target.id}`, {
    //         productId: event.target.id
    //     })
    //     setProducts(products.filter((item)=>{
    //         return item._id !== event.target.id
    //     }))
    // }

    // const searchOnSubmit = (event) =>{
    //     event.preventDefault()
    // }
    // const searchOnChange = (event) => {
    //     // setSearchInput(event.target.value)
    //     const searchInput = event.target.value
    //     const search = []
    //     for (let i in constProducts) {
    //         if ((constProducts[i].productName).toLowerCase().includes(searchInput)) {
    //             search.push(constProducts[i])
    //         }
    //     }
    //     setProducts(search)
    // }

    // const sortTable = (event) => {
    //     if (event.target.id === "Name") {
    //         if (isSortByName) {
    //             const sortByName = [...products]
    //             sortByName.sort(function(a, b) {
    //                 var nameA = a.productName.toLowerCase();
    //                 var nameB = b.productName.toLowerCase(); 
    //                 if(nameA === nameB) return 0; 
    //                 return nameA > nameB ? 1 : -1;
    //             })
    //             setIsSortByName(false)
    //             setProducts(sortByName)
    //         } else {
    //             const sortByName = [...products]
    //             sortByName.sort(function(a, b) {
    //                 var nameA = a.productName.toLowerCase();
    //                 var nameB = b.productName.toLowerCase(); 
    //                 if(nameA === nameB) return 0; 
    //                 return nameA < nameB ? 1 : -1;
    //             })
    //             setIsSortByName(true)
    //             setProducts(sortByName)
    //         }
    //     }
    //     if (event.target.id === "Price") {
    //         if (isSortByPrice) {
    //             const sortByName = [...products]
    //             sortByName.sort(function(a, b) {
    //                 var nameA = a.productName;
    //                 var nameB = b.productName; 
    //                 if(nameA === nameB) return 0; 
    //                 return nameA > nameB ? 1 : -1;
    //             })
    //             setIsSortByPrice(false)
    //             setProducts(sortByName)
    //         } else {
    //             const sortByName = [...products]
    //             sortByName.sort(function(a, b) {
    //                 var nameA = a.productName;
    //                 var nameB = b.productName; 
    //                 if(nameA === nameB) return 0; 
    //                 return nameA < nameB ? 1 : -1;
    //             })
    //             setIsSortByPrice(true)
    //             setProducts(sortByName)
    //         }
    //     }
    //     if (event.target.id === "Sale") {
    //         if (isSortBySale) {
    //             const sortByName = [...products]
    //             sortByName.sort(function(a, b) {
    //                 var nameA = a.productName;
    //                 var nameB = b.productName; 
    //                 if(nameA === nameB) return 0; 
    //                 return nameA > nameB ? 1 : -1;
    //             })
    //             setIsSortBySale(false)
    //             setProducts(sortByName)
    //         } else {
    //             const sortByName = [...products]
    //             sortByName.sort(function(a, b) {
    //                 var nameA = a.productName;
    //                 var nameB = b.productName; 
    //                 if(nameA === nameB) return 0; 
    //                 return nameA < nameB ? 1 : -1;
    //             })
    //             setIsSortBySale(true)
    //             setProducts(sortByName)
    //         }
    //     }
    //     if (event.target.id === "Sold") {
    //         if (isSortBySold) {
    //             const sortByName = [...products]
    //             sortByName.sort(function(a, b) {
    //                 var nameA = a.productName;
    //                 var nameB = b.productName; 
    //                 if(nameA === nameB) return 0; 
    //                 return nameA > nameB ? 1 : -1;
    //             })
    //             setIsSortBySold(false)
    //             setProducts(sortByName)
    //         } else {
    //             const sortByName = [...products]
    //             sortByName.sort(function(a, b) {
    //                 var nameA = a.productName;
    //                 var nameB = b.productName; 
    //                 if(nameA === nameB) return 0; 
    //                 return nameA < nameB ? 1 : -1;
    //             })
    //             setIsSortBySold(true)
    //             setProducts(sortByName)
    //         }
    //     }
    // }

    return (
        <div className="topfive flex-col" style={{width: '100%'}}>
            <div className={`headerbox flex-center ${props.color}`}>
                <FontAwesomeIcon icon={props.icon} className="icon"/>
            </div>
            <div className="top-location-container">
                <div className="headerbox-header">
                    <p>{props.title}</p>
                </div>
                <div className="topfive-content flex-col">
                    <div className="dashboard-addnew flex">
                        <div 
                            className="dashboard-addnew-btn btn"
                            onClick={props.setOpenCreateFunc}
                        >Add new</div>
                        <div className="dashboard-addnew-search">
                            <form 
                                // onSubmit={searchOnSubmit}
                            >
                                <input type="text" placeholder="Search records"
                                    // onChange={searchOnChange}
                                ></input>
                            </form>
                        </div>
                    </div>
                    <table className="dashboard-table" style={{tableLayout: 'fixed'}}>
                        <tbody>
                            <tr>
                                {
                                    props.table.map((item, index) => {
                                        return (
                                            <th 
                                                key={index} className="table-new-title"
                                                // onClick={(event)=>{
                                                //     sortTable(event)
                                                // }}
                                                id={item}
                                            >
                                                {item}
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                            {
                                current.map((item, index) => {
                                    const date = new Date(item.newDate)
                                    const day = date.getDay();
                                    const month = date.getMonth();
                                    const year = date.getFullYear();
                                    const shortedDate = day + '/' + month + '/' + year;

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <p>{item.newTitle}</p>
                                            </td>
                                            <td 
                                                style={{
                                                    padding: '10px 10px',
                                                }}
                                            >
                                                <p style={{webkitLineClamp: '3'}}>{item.newContent}</p>
                                            </td>
                                            <td>
                                                <p>{item.newCate}</p>
                                            </td>
                                            <td>
                                                <p>{item.newTime}</p>
                                            </td>
                                            <td>
                                                <p>{item.newView}</p>
                                            </td>
                                            <td>
                                                <div className="action-table flex">
                                                    <div 
                                                        className="action-item flex-center action-green"
                                                        onClick={props.setOpenEditFunc}
                                                        id={item._id}
                                                        >
                                                        <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faPencilAlt}/>
                                                    </div>
                                                    <div 
                                                        className="action-item flex-center action-red"
                                                        // onClick={deleteOnClick}
                                                        id={item._id}
                                                        >
                                                        <FontAwesomeIcon style={{pointerEvents: 'none'}} icon={faTimes}/>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    
                    <div className="pagination-container flex" style={{ justifyContent: 'flex-end', margin: '20px 0'}}>
                        <div className="pagnigation flex-center" onClick={choosePage}>
                            <div id="-1" className={classNames({
                                pagnigation_disable: currentPage === 1
                            })}>←</div>
                            { pages.map(function(number, index) { 
                                if (currentPage === number) {
                                    return (
                                        <div key={number} id={number} className="pagnigation-active">
                                            {number}
                                        </div>
                                    )
                                } else {
                                    return (
                                    <div 
                                        key={number}
                                        id={number}
                                        >
                                            {number}
                                    </div>
                                    )
                                }
                            })}
                            <div id="999" className={classNames({
                                pagnigation_disable: currentPage === pageNumbers.length
                            })}>→</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}