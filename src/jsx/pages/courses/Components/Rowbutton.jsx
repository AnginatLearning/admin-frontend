import React from 'react'
import ButtonComponent from './ButtonComponent'
import InputField from './InputField'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const Rowbutton = () => {
    const navigate = useNavigate()
  const handlefaq = ()=>{
    navigate('/Faq-courses')
  }
    const options1 = [
        { value: '1', label: 'English' },
        { value: '2', label: 'French' },
        { value: '3', label: 'Korean' },
        { value: '4', label: 'German' },
      ];
    
    return (
        <div>
            <div className="row">
                <div className="col-lg-12">


                    <form >

                        <div className="row">
                            <div
                                className="col-lg-6"
                                style={{ marginBottom: '10px' }}
                            >
                                <ButtonComponent
                                    label="Add FAQs"
                                    type="button"
                                    className="btn btn-primary w-100 me-1"
                                    onClick={handlefaq}
                                />
                            </div>
                            <div
                                className="col-lg-6 "
                                style={{ marginBottom: '10px', height:"41px" }}
                            >
                              
                                <Select
                                    isSearchable={false}
                                    options={options1}
                                    className="custom-react-select "
                                    placeholder="Select Video Library"
                                />
                            </div>
                        </div>


                    </form>

                </div>
            </div>
        </div>
    )
}

export default Rowbutton