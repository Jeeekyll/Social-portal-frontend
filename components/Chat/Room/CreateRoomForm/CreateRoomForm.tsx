import React, { FC, useState } from 'react';
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CreateRoomDto } from 'store/types/room.type';
import cn from 'classnames';
import styles from './CreateRoomForm.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateRoomSchema } from '@utils/validation';
import { CreateRoomProps } from '@components/Chat/Room/CreateRoomForm/CreateRoom.props';
import { RoomService } from '@services/Room.service';

const CreateRoomForm: FC<CreateRoomProps> = ({ addRoom }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const {
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm<CreateRoomDto>({
    resolver: yupResolver(CreateRoomSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<CreateRoomDto> = async (
    createRoomDto: CreateRoomDto
  ) => {
    try {
      const room = await RoomService.create(createRoomDto);
      addRoom(room);
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button size='small' variant='outlined' onClick={handleModalOpen}>
        Create
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={isModalOpen}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <Box>
            <div className={cn(styles['create-modal'])}>
              <div className={cn(styles['create-modal__body'])}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Typography
                    variant='h4'
                    className={cn(styles['create-modal__title'])}
                  >
                    Create Room
                  </Typography>
                  <Controller
                    control={control}
                    name='name'
                    render={({ field: { onChange } }) => (
                      <TextField
                        error={errors.name && true}
                        label='Name'
                        onChange={onChange}
                        className={cn(styles['create-modal__input'])}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name='description'
                    render={({ field: { onChange } }) => (
                      <TextField
                        error={errors.description && true}
                        label='Description'
                        onChange={onChange}
                        className={cn(styles['create-modal__input'])}
                      />
                    )}
                  />

                  <div className={cn(styles['create-modal__footer'])}>
                    <Button type='button' onClick={handleModalClose}>
                      Close
                    </Button>
                    <Button type='submit' variant='contained'>
                      Save
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CreateRoomForm;
