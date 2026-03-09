"use client"
import React from 'react'
import "./Breadcrumb.css"
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

const Breadcrumb = ({title, image}) => {
    return (
           <section className='breadcrumb-section' style={{ backgroundImage: `url(${image})` }}>
            <div className="breadcrumb-wrapper">
           
                  <Row>
                    <Col xs={12} lg={12} md={12} className="text-start" > {/* Added text-center to center content in the column */}
                            {/* <h2 className="breadcrumb-title">{title}</h2>  */}
                            </Col>
                         <Col xs={12} lg={12} md={12}>
                           <div className="breadcrumb-list ">
                                <ul className="list-items">                                    <li>
                                       <Link href="/" style={{color:"gray"}}>Home</Link>
                                    </li>
                                    {/* Adding the separator */}
                                   <li className="separator"><KeyboardDoubleArrowRightIcon fontSize="small" /> </li>
                                   <li>{title}</li>
                                </ul>
                           </div>
                      </Col>
                   </Row>

            </div>
            
        </section>
    )
}

export default Breadcrumb
