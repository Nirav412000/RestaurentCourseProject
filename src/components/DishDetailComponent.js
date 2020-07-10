import React from 'react';
import {Card, CardImg, CardText, CardTitle, CardBody , BreadcrumbItem, Breadcrumb} from 'reactstrap';
import { Link } from 'react-router-dom';

    const DishDetail = (props) => {
        if(props.dish != null){

            const allcomment = props.comments.map((comm) => {
                return(
                    <div className="container">
                    <div key={comm.id}>
                        <p>{comm.comment}</p>
                        <p>--{comm.author},   {new Intl.DateTimeFormat('en-US',{ year: 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comm.date)))}</p>
                    </div>
                    </div>
                );
            }); 

            return(
                <div className="container">
                    <div className="row" >
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 mt-1">
                            <Card>
                                <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
                                <CardBody>
                                    <CardTitle>{props.dish.name}</CardTitle>
                                    <CardText>{props.dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 mt-1">
                            <h2>Comments</h2>
                            {allcomment}
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    };


export default DishDetail;