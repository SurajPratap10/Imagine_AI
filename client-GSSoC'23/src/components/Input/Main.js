import React, { useState } from "react";
import { Input, Button, Select } from "@chakra-ui/react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Input.css";

const server = "http://localhost:11000/openai";
const Main = () => {
  const [value, setValue] = useState({
    prompt: null,
    size: null,
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (value.prompt === null || value.size === null) {
        toast.error("Please fill all the fields");
      } else {
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`${server}/generate`, value, config);
      }
    } catch (err) {
      toast.error(err.response.data.error.error.message);
    }
  };

  return (
    <>
      <div className="container-fluid input-wrapper p-0">
        <div className="row m-0 input-row">
          <div className="col-md p-0 input-col">
            <div className="input__box">
              <Input
                placeholder="Please describe an image to generate"
                size="md"
                className="input-text"
                onChange={(e) => (value.prompt = e.target.value)}
                name="prompt"
                isRequired
              />

              <Select
                placeholder="Select a size"
                className="bg-white select-text"
                onChange={(e) => (value.size = e.target.value)}
                name="size"
                required="true"
              >
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
              </Select>
            </div>
            <div className="btn__box">
              <Button
                colorScheme="blue"
                className="button__text"
                type="submit"
                onClick={submitHandler}
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
