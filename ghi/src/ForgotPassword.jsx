import emailjs from 'emailjs-com'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function ForgotPassword() {
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
                },
                (error) => {
                    console.log(error.text)
                }
            )
    }

    return (
        <div className="container mt-5">
            <h2>Forgot Password</h2>
            <form onSubmit={sendPasswordResetEmail} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="from_name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="from_name"
                        name="from_name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="from_email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="from_email"
                        name="from_email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                        Subject
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="html_message" className="form-label">
                        Message
                    </label>
                    <textarea
                        className="form-control"
                        id="html_message"
                        name="html_message"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    Send
                </button>
            </form>
        </div>
    )
}
