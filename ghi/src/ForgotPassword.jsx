import emailjs from 'emailjs-com'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import logo from './assets/FIFOFlow_transparent_x1.png'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const navigate = useNavigate()

    function sendPasswordResetEmail(event) {
        event.preventDefault()

        emailjs
            .sendForm(
                'service_g5kc3id',
                'template_bqlmx5j',
                event.target,
                '9Msr9C-Xs_cPMhr2F'
            )
            .then(
                (result) => {
                    window.location.reload()
                    console.log(result)
                },
                (error) => {
                    console.log(error.text)
                }
            )
            navigate('/')
    }

    return (
        <>
            <div className="App">
                <header className="App-header">
                    <img className="logo" src={logo} alt="FIFOFlow Logo" />
                    <h5 className="motto">
                        An open-source, automated system for managing your
                        logistical nightmares!
                    </h5>
                    <div className="forgot-password-wrapper custom-shadow1">
                        <div>
                            <h2>Forgot Password</h2>
                            <Form
                                onSubmit={sendPasswordResetEmail}
                                className="mt-3"
                            >
                                <FloatingLabel
                                    controlId="FloatingName"
                                    label="Name"
                                    className="mb-1"
                                >
                                    <Form.Control
                                        type="text"
                                        name="from_name"
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="FloatingEmail"
                                    label="Email"
                                    className="mb-1"
                                >
                                    <Form.Control
                                        type="email"
                                        name="from_email"
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="FloatingSubject"
                                    label="Subject"
                                    className="mb-1"
                                >
                                    <Form.Control
                                        type="text"
                                        name="subject"
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="FloatingMessage"
                                    label="message"
                                    className="mb1"
                                >
                                    <Form.Control
                                        as="textarea"
                                        className="form-control"
                                        name="html_message"
                                        style={{ height: '100px' }}
                                        required
                                    />
                                </FloatingLabel>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="btn mt-2"
                                >
                                    Send
                                </Button>
                            </Form>
                            <Button
                                className="btn mt-2"
                                as={Link}
                                to="/"
                                variant="primary"
                            >
                                Go Back
                            </Button>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}
