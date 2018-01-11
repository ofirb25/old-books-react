import React from 'react';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardFooter
} from 'reactstrap';

function BookCard(props) {
    var { book } = props;
    return (
        <React.Fragment>
            <Card>
                <CardImg top width="100%" src={book.imageLink} alt={book.title} />
                <CardBody>
                    <CardTitle>{book.title}</CardTitle>
                    <CardSubtitle>{book.author} - {new Date(book.date).getFullYear()}</CardSubtitle>
                    {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            {/* <Button>Button</Button> */}
                </CardBody>
                <CardFooter>
                    <Button color="primary" onClick={() => { props.handleEdit(book) }}>Edit</Button>
                    <Button onClick={() => { props.handleDelete(book.id, book.title) }} color="danger">Delete</Button>
                </CardFooter>
            </Card>
        </React.Fragment>
    );
}

export default BookCard