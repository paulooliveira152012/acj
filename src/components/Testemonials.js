import '../styles/style.css'

const testimonials = [
    {
        name: "paulo",
        message: "Job necely done"
    }, 
    {
        name: "Gabi",
        message: "awesome!"
    },
    {
        name: "paulo",
        message: "Job necely done"
    }, 
    {
        name: "Gabi",
        message: "awesome!"
    },
    {
        name: "paulo",
        message: "Job necely done"
    }, 
    {
        name: "Gabi",
        message: "awesome!"
    },
]

const Testemonials = () => {
    return (
        <div className="testemonialsContainer">
            <h2>What our clients say</h2>
            <div className='testemonials'>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className='container'>
                        <p>{testimonial.name}</p>
                        <p>{testimonial.message}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testemonials