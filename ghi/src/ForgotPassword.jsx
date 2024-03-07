import React from 'react'
import emailjs from 'emailjs-com'

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
                    window.location.reload() //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
                },
                (error) => {
                    console.log(error.text)
                }
            )
    }

    return (
        <form className="contact-form" onSubmit={sendPasswordResetEmail}>
            <input type="hidden" name="contact_number" />
            <label>Name</label>
            <input type="text" name="from_name" />
            <label>Email</label>
            <input type="email" name="from_email" />
            <label>Subject</label>
            <input type="text" name="subject" />
            <label>Message</label>
            <textarea name="html_message" />
            <input type="submit" value="Send" />
        </form>
    )
}
