import React from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter,
    Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import swal from 'sweetalert2'

class EditBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {
                title: '',
                author: '',
                date: '',
                imageLink: ''
            }
        };
    }
    componentDidMount() {
        if (this.props.book) {
            this.setState({ book: { ...this.props.book } })
        }
    }

    toggle = () => {
        this.props.handleToggleModal();
    }

    handleTitleChange = (e) => {
        this.setState({ book: { ...this.state.book, title: e.target.value } })
    }
    handleAuthorChange = (e) => {
        
        this.setState({ book: { ...this.state.book, author: e.target.value } })
    }
    handleDateChange = (e) => {
        this.setState({ book: { ...this.state.book, date: e.target.value }})
    }
    handleImageChange = (e) => {
        this.setState({ book: { ...this.state.book, imageLink: e.target.value } })
    }
    handleSave = (e) => {
        var { book } = this.state;
        if (book.title && book.date && book.author) {
            var m = this.props.isUniqueName(book.title,book.id)
            if (!m) {
                this.props.handleSave(this.state.book);
                this.toggle();
            } else {
                swal('book name must be unique', '', 'warning')
            }
        }
        else {
            swal('You must complete the form',
                'all fields with *  are mandatory',
                'warning')
        }
    }


    render() {
        var { book } = this.state
        return (
            <div>
                <Modal isOpen={true} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Book Details</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Book Title *</Label>
                                <Input value={book.title} onChange={this.handleTitleChange} />
                                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Author *</Label>
                                <Input value={book.author} onChange={this.handleAuthorChange} />
                                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Publish Date *</Label>
                                <Input type="date"  value={book.date} onChange={this.handleDateChange} />
                                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label>Image URL</Label>
                                <Input value={book.imageLink} onChange={this.handleImageChange} />
                                <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSave}>Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default EditBook;