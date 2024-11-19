import { PencilLine, Plus } from '@phosphor-icons/react';
import React, { useState } from 'react';
import { DatePicker } from 'rsuite';
import ButtonComponent from './ButtonComponent';

const Batch = ({ iconMoved, setIconMoved }) => {
   

    
    const handlePlusClick = () => {
        setIconMoved(!iconMoved);
    };

    return (
        <div>
           
            <div
                style={{
                    display: "flex",
                    justifyContent: iconMoved ? "space-between" : "flex-start",
                    alignItems: "center",
                    paddingBottom: "5px",
                    paddingTop: "5px",
                }}
            >
                <p
                    style={{
                        fontSize: "14px",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0",
                        marginBottom: "0px",
                    }}
                >
                    Add Batch
                </p>
                {iconMoved && (
                    <Plus
                        size={21}
                        color="black"
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        onClick={handlePlusClick}
                    />
                )}
            </div>

        
            {!iconMoved && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "5px",
                    }}
                >
                    <p
                        style={{
                            fontSize: "11px",
                            color: "#9E989F",
                            margin: "0 5px 0 0",
                        }}
                    >
                        Select date and time
                    </p>
                    <Plus
                        size={21}
                        color="black"
                        style={{ cursor: "pointer" }}
                        onClick={handlePlusClick}
                    />
                </div>
            )}

            {iconMoved && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                    className="Select-date"
                >
                    <div
                        style={{
                            height: "44px",
                            backgroundColor: "#6A73FA",
                            padding: "12px",
                            borderRadius: "5px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                color: "white",
                                gap: "10px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                marginTop: "0px",
                                marginBottom: "0px",
                            }}
                        >
                            <p
                                style={{
                                    marginTop: "0px",
                                    marginBottom: "0px",
                                    fontSize: "12px",
                                    fontWeight: "300",
                                }}
                            >
                                Nov 3, 2024
                            </p>
                            <p
                                style={{
                                    marginTop: "0px",
                                    marginBottom: "0px",
                                    fontSize: "12px",
                                    fontWeight: "300",
                                }}
                            >
                                |
                            </p>
                            <p
                                style={{
                                    marginTop: "0px",
                                    marginBottom: "0px",
                                    fontSize: "12px",
                                    fontWeight: "300",
                                }}
                            >
                                10:00AM - 08:00 PM
                            </p>
                        </div>
                        <div>
                            <PencilLine size={18} color="white" />
                        </div>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexDirection: "column",
                            padding: "12px",
                            outline: "1px solid #888888",
                            borderRadius: "5px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "14px",
                                fontWeight: "400",
                                color: "black",
                                marginTop: "0px",
                                marginBottom: "0px",
                            }}
                        >
                            Select date and time
                        </p>
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "10px",
                            }}
                        >
                            <div>
                                <DatePicker
                                    placeholder="Date of Birth"
                                    className="picker-suit datepicker"
                                />
                            </div>

                            <div
                                style={{
                                    outline: "1px #E0E0E0 solid",
                                    width: "156px",
                                    height: "33px",
                                    borderRadius: "5px",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "12px",
                                        marginTop: "0px",
                                        marginBottom: "0px",
                                        color: "black",
                                        padding: "8px 20px 8px 20px",
                                    }}
                                >
                                    02:00 PM - 10:00 PM
                                </p>
                            </div>

                            <div
                                style={{
                                    outline: "1px #E0E0E0 solid",
                                    width: "100px",
                                    height: "33px",
                                    borderRadius: "50px",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "12px",
                                        marginTop: "0px",
                                        marginBottom: "0px",
                                        color: "black",
                                        padding: "8px 20px 8px 20px",
                                    }}
                                >
                                    TimeZone
                                </p>
                            </div>
                        </div>

                        <p
                            style={{
                                fontSize: "10px",
                                fontWeight: "400",
                                color: "#888888",
                                marginTop: "0px",
                                marginBottom: "0px",
                            }}
                        >
                            Course will be private before publishing
                        </p>

                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "end",
                            }}
                        >
                            <ButtonComponent
                                label="Apply"
                                type="submit"
                                className="btn btn-primary Both-btn"
                            />
                            <ButtonComponent
                                label="Cancel"
                                type="submit"
                                className="btn btn-danger light Both-btn"
                            />
                        </div>
                    </div>
                </div>
                
            )}
        </div>
    );
};

export default Batch;
