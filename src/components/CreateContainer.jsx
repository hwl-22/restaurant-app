import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setFoodItems } from '../app/Features/foodItemsSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase.config';
import { getFoodItems, saveItem } from '../utils/firebaseFunctions';

import { motion } from 'framer-motion';
import { GiCakeSlice, GiPriceTag, GiDonut } from 'react-icons/gi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import Alert from '@mui/material/Alert';

import Loader from './Loader';
import { InputSelect, InputText } from './constants/Input';
import { DUMMY_OPTIONS } from '../utils/dummydata';

const schema = yup.object().shape({
  title: yup.string().required('Enter title'),
  category: yup.string().required('Select Category'),
  calorie: yup.number().positive().integer().required('Enter Calorie'),
  price: yup.number().positive().required('Enter price'),
});

const CreateContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [alertStatus, setAlertStatus] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const fetchItems = async () => {
    await getFoodItems().then((data) => dispatch(setFoodItems(data)));
  };

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        return;
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          setIsLoading(false);
          setAlertStatus(false);
          setAlertMessage('Uploading image failed');
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((data) => {
          setUploadedImg(data);
          setIsLoading(false);
          setAlertStatus(true);
          setAlertMessage('Image Uploaded Successfully!');
          setTimeout(() => {
            setAlertStatus(null);
          }, 4000);
        });
      }
    );
  };

  const handleDelete = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, uploadedImg);
    deleteObject(deleteRef).then(() => {
      setIsLoading(false);
      setUploadedImg(null);
      setAlertStatus(true);
      setAlertMessage('Image deleted successfully !');
      setTimeout(() => {
        setAlertStatus(null);
      }, 4000);
    });
  };

  const submitForm = (formData) => {
    setIsLoading(true);

    try {
      const data = {
        id: `${Date.now()}`,
        title: formData.title,
        imageURL: uploadedImg,
        category: formData.category,
        calorie: formData.calorie,
        price: formData.price,
        quantity: 1,
      };

      saveItem(data);
      setIsLoading(false);
      setAlertStatus(true);
      setAlertMessage('Data uploaded successfully !');
      setUploadedImg(null);
      reset();
      setTimeout(() => {
        setAlertStatus(null);
      }, 4000);

      fetchItems();
    } catch (error) {
      console.log(error);
      setAlertStatus(false);
      setAlertMessage('Error while trying to save data');
      setTimeout(() => {
        setAlertStatus(null);
      }, 4000);
    }
  };

  return (
    <section className=" w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] flex flex-col justify-center border border-gray-300 rounded-md p-4 space-y-4 ">
        {alertStatus && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Alert severity={alertStatus ? 'success' : 'error'}>
              {alertMessage}
            </Alert>
          </motion.div>
        )}
        <form
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit(submitForm)}
        >
          <InputText
            name={'title'}
            control={control}
            placeholder={'Title here'}
            fullWidth={true}
            icon={<GiCakeSlice className="text-[1.5rem]" />}
            error={errors?.title?.message}
          />
          <InputSelect
            name={'category'}
            control={control}
            options={DUMMY_OPTIONS}
            initial={true}
            size="small"
            error={errors?.category?.message}
          />
          <div className=" flex flex-col items-center justify-center min-h-225 md:min-h-420 p-6   border border-slate-400 border-dotted rounded-lg cursor-pointer ">
            {isLoading ? (
              <Loader />
            ) : !uploadedImg ? (
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <div className="flex flex-col items-center gap-2 text-gray-500">
                  <AiOutlineCloudUpload className="text-[2rem]" />
                  <p>Click here to upload</p>
                </div>
                <input
                  onChange={handleUploadImage}
                  name="uploadimg"
                  type="file"
                  accept="image/*"
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <img
                  className=" block object-cover"
                  src={uploadedImg}
                  alt="uploaded-img"
                />
                <button
                  onClick={handleDelete}
                  className=" w-[50%] px-4 py-2 rounded-lg  bg-red-600 hover:shadow-md "
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <InputText
            name={'calorie'}
            control={control}
            placeholder={'Calories'}
            fullWidth={true}
            icon={<GiDonut className="text-[1.5rem]" />}
            error={errors?.calorie?.message}
          />
          <InputText
            name={'price'}
            control={control}
            placeholder={'Price'}
            fullWidth={true}
            icon={<GiPriceTag className="text-[1.5rem]" />}
            error={errors?.price?.message}
          />
          <button
            className="w-full md:w-max md:self-end font-medium px-3 py-2 rounded-md text-white bg-orange-500 hover:bg-orange-400"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateContainer;
