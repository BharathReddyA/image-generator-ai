import React, { useState } from "react";
import axios from "axios";
import { Container, Form } from "react-bootstrap";

const OpenAIComponent = () => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/api",
        {
          prompt: text,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response data:", response.data); // Log response data for debugging

      const imageUrl = response.data.photo;
      console.log("Image URL:", imageUrl); // Log image URL for debugging
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateImage();
  };

  return (
    <div>
      <Container
        style={{ backgroundColor: "grey", minHeight: "700px" }}
        className="p-5"
      >
        <Form onSubmit={handleSubmit}>
          <Form.Control
            type="text"
            name="searchingText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              paddingBottom: "10px",
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "0px 10px 10px 0px grey",
              marginBottom: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "5px",
              color: "white",
              boxShadow: "0px 5px 5px 0px #000",
              backgroundColor: "#000",
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </Form>
        {imageUrl && (
          <Container>
            <div>
              <img
                src={imageUrl}
                alt="Generated"
                style={{ marginTop: "20px", maxWidth: "100%" }}
              />
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
};

export default OpenAIComponent;
