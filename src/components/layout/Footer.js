import React from 'react'
import '../../css/footer.css'
const Footer = () => {
  return (
    <footer className='mt-4'>
        {/* <div className='line'></div> */}
        <div className='d-flex justify-content-center'>
            <div>
            <p className='mb-0 pt-3 text-center'>Follow me</p>
            <a href='https://twitter.com/hossam_alhamidi' target="_blank" className='mx-2'><i className='bi bi-twitter '></i></a>
            <a href='https://www.linkedin.com/in/hossamalhamidi-m/' target="_blank" className='mx-2'><i className='bi bi-linkedin '></i></a>
            <a href='https://github.com/hossamAlhamidi' target="_blank" className='mx-2'><i className='bi bi-github '></i></a>
            </div>
        </div>
    </footer>
  )
}

export default Footer