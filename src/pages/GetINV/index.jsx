import { Button, Grid2, Stack, styled } from "@mui/material";
import BackButton from "../../components/BackButton";
import { useState } from "react";
import axios from "axios";

const CodeBlock = styled("pre")(({ theme }) => ({
  display: "inline-block",
  maxWidth: "100%",
  overflow: "auto",
  border: "1px solid red",
  borderRadius: "4px",
  padding: ".5rem",
  margin: 0,
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
}));

const GetINV = () => {
  const [resp, setResp] = useState(null);
  // fetch api using axios
  const getINV = async (type) => {
    try {
      const url = `http://192.168.100.126:8000/api/v1/external/${type}`;
      const response = await axios.get(url)
      const data = response?.data;
      setResp(data);
    } catch (error) {
      setResp(`${error.message}\n\n[Mock] ${type}`);
      console.log(error);
    }
  }
  return (
    <div class="main">
      <Grid2
        container
        gap={1}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          m: "1rem 0",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} direction="row" sx={{mb: "1.5rem"}}>
          <Button variant="contained" onClick={() => getINV('QR')}>QR</Button>
          <Button variant="contained" onClick={() => getINV('CARD')}>Card</Button>
          <Button variant="contained" onClick={() => getINV('PAYPLUS')}>PayPlus</Button>
        </Stack>
        {/* <CodeBlock /> */}
        <CodeBlock>Result: {resp}</CodeBlock>
        {/* <CodeBlock>redirectUrl: {redirectUrl}</CodeBlock> */}
      </Grid2>
      {/* <BackButton /> */}
      <Button variant="contained" onClick={() => window.location.reload()}>Refresh</Button>
    </div>
  );
};

export default GetINV;
