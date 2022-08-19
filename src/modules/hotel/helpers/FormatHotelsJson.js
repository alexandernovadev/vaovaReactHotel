/**
 * This function remove object state that is used to check,
 * chekbox work to hidden the field number rooms
 * @param {*} hotel
 * @returns
 */
export const FormatToSave = (hotel) => {
  const newHotel = {
    ...hotel,
    one_queen_bedroom: hotel.roomtypes.one_queen_bedroom.state
      ? hotel.roomtypes.one_queen_bedroom.value
      : null,
    single_room: hotel.roomtypes.single_room.state
      ? hotel.roomtypes.single_room.value
      : null,
    two_twin_bedroom: hotel.roomtypes.two_twin_bedroom.state
      ? hotel.roomtypes.two_twin_bedroom.value
      : null,
  };
  delete newHotel.roomtypes;

  return newHotel;
};

/**
 * This function add {state, value} to form works with checkbox
 * @param {*} hotel
 * @returns
 */
export const FormatToForm = (hotel) => {
  const two_twin_bedroom = hotel.two_twin_bedroom
    ? { state: true, value: hotel?.two_twin_bedroom }
    : { state: false, value: 0 };

  const one_queen_bedroom = hotel.one_queen_bedroom
    ? { state: true, value: hotel?.one_queen_bedroom }
    : { state: false, value: 0 };

  const single_room = hotel.single_room
    ? { state: true, value: hotel?.single_room }
    : { state: false, value: 0 };

  const HotelFormat = {
    ...hotel,
    roomtypes: {
      two_twin_bedroom,
      one_queen_bedroom,
      single_room,
    },
  };

  delete HotelFormat.two_twin_bedroom;
  delete HotelFormat.one_queen_bedroom;
  delete HotelFormat.single_room;

  return HotelFormat;
};
