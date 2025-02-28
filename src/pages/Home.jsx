import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid2,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Compressor from "compressorjs";

function Home() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const defaultInputs = useMemo(() => ({
    trackingNumber: { label: "เลขพัสดุ", value: "", visible: true },
    addressNo: { label: "บ้านเลขที่", value: "", visible: true },
    carrier: { label: "บริษัทขนส่ง", value: "", visible: true },
    packageType: { label: "ประเภทพัสดุ", value: "", visible: true },
    description: { label: "ลักษณะ (ขนาด, สี)", value: "", visible: true },
    recipientName: { label: "ชื่อผู้รับ", value: "", visible: true },
    fragile: { label: "ระวังแตก", value: "", visible: false },
    senderName: { label: "ชื่อผู้ส่ง", value: "", visible: true },
  }), []);
  const [inputs, setInputs] = useState(defaultInputs);
  const [isUploading, setIsUploading] = useState(false);
  const modal = withReactContent(Swal);
  
  const resizeImage = async (file) => {
    // Resize logic here using canvas
    // After resizing, update state with resized file
    const resizedFile = await new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.9, // Adjust the desired image quality (0.0 - 1.0)
        maxWidth: 2000, // Adjust the maximum width of the compressed image
        maxHeight: 2000, // Adjust the maximum height of the compressed image
        mimeType: "image/jpeg", // Specify the output image format
        success(result) {
          resolve(result);
        },
        error(error) {
          reject(error);
        },
      });
    });
    // console.log('🚀 ~ resizedFile ~ resizedFile:', resizedFile)
    setFile(resizedFile); // Replace with actual resized file
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      modal.fire({
        title: "Please Wait !",
        html: "Processing your image with AI 🤖...", // add html attribute if you want or remove
        allowOutsideClick: false,
        showCancelButton: false, // There won't be any cancel button
        showConfirmButton: false, // There won't be any confirm button
      });
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: formData,
      });

      const result = await response.json();
      // console.log("🚀 ~ handleUpload ~ result:", result);
      populateInputs(result);
      setIsUploading(false);
      modal.close();
      // Swal.fire({
      //   title: 'Please Wait !',
      //   html: 'data uploading',// add html attribute if you want or remove
      //   allowOutsideClick: false,
      //   showCancelButton: false, // There won't be any cancel button
      //   showConfirmButton: false, // There won't be any confirm button
      //   onBeforeOpen: () => {
      //     Swal.showLoading()
      //   },
      // });
    } catch (error) {
      console.error("Upload failed:", error);
      modal.close();
      modal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      })
      setIsUploading(false);
    }
  };

  const clear = () => {
    inputRef.current.value = null;
    setFile(null);
    setInputs(defaultInputs);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    // console.log('🚀 ~ handleFileChange ~ selectedFile:', selectedFile)
    if (selectedFile) {
      // Check file size
      if (selectedFile.size > 1 * 1024 * 1024) {
        modal.fire({
          title:'Please Wait',
          html:'Resizing your image...',
          timer: 2000,
          timerProgressBar: true,
        })
        resizeImage(selectedFile);
        // modal.fire({
        //   icon: "error",
        //   title: "ขนาดไฟล์เกิน 1 MB",
        //   text: "กรุณาเลือกไฟล์ใหม่",
        // }).then(() => {
        //   inputRef.current.value = null;
        //   setFile(null);
        //   clear();
        // });
      } else {
        setFile(selectedFile);
      }
    }
  };

  const populateInputs = (tmp) => {
    const [data] = tmp;
    setInputs((prevInputs) => ({
      ...prevInputs,
      trackingNumber: {
        ...prevInputs.trackingNumber,
        value: data.output.tracking_number,
      },
      addressNo: {
        ...prevInputs.addressNo,
        value: data.output.recipient.address.address_no,
      },
      carrier: {
        ...prevInputs.carrier,
        value: data.output.shipping_details.carrier || "",
      },
      packageType: {
        ...prevInputs.packageType,
        value: data.output.package_details.type,
      },
      description: {
        ...prevInputs.description,
        value: `${data.output.package_details.description}, ${data.output.package_details.color}`,
      },
      recipientName: {
        ...prevInputs.recipientName,
        value: data.output.recipient.name,
      },
      fragile: {
        ...prevInputs.fragile,
        value: data.output.shipping_details.fragile,
      },
      //  senderName:{...prevInputs.senderName,value:data.output.sender.name}
    }));
  };

  return (
    <Box sx={{ width: { xs: "100%", md: "80%" }, mx: "auto" }}>
      <Grid2 container direction="column" spacing={2}>
        <Grid2 item>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            ref={inputRef}
          />
        </Grid2>
        <Grid2 item>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? "Processing..." : "Upload"}
          </Button>
        </Grid2>
        {Object.keys(inputs)
          .filter((key) => inputs[key].visible)
          .map((key) => (
            <Grid2 item key={key}>
              <TextField
                label={inputs[key].label}
                value={inputs[key].value}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    [key]: { ...inputs[key], value: e.target.value },
                  })
                }
                fullWidth
              />
            </Grid2>
          ))}
        <Grid2 item>
          {/* <BooleanField label={inputs.fragile.label} value={inputs.fragile.value} onChange={(e) => setInputs({
            ...inputs,
            fragile: { ...inputs.fragile, value:e.target.value }
          })} /> */}
          <FormGroup fullWidth>
            <FormControlLabel
              control={<Checkbox checked={inputs.fragile.value} />}
              label={inputs.fragile.label}
            />
          </FormGroup>
        </Grid2>
        <Grid2 item>
          <Button variant="contained" onClick={clear}>
            Clear
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Home;
