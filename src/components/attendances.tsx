import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Iattendance } from '../types/Iattendance';

export const timeFomat = function (date: string | Date) {
  const time = new Date(date);
  return `${time.getFullYear()}.${time.getMonth()}.${time.getDate()}`;
};

const Atttendance = ({ attendace, deleteAtt }: { attendace: Iattendance; deleteAtt: (id: number) => void }) => {
  const created_at_format = useMemo(() => {
    const time = new Date(attendace.created_at);
    return `${time.getFullYear()}.${time.getMonth()}.${time.getDay()}`;
  }, [attendace]);

  return (
    <div style={{ background: '#F0C292' }} className="flex justify-between   w-full  rounded-xl p-2 pt-4 pb-4">
      <Link to={'Attendances/' + attendace.id} className="flex justify-between w-5/6">
        <h1 className="p-3 font-semibold text-base lg:text-xl  text-center">{attendace.title}</h1>
        <h1 className="p-3 font-semibold text-base lg:text-xl text-center">{attendace.start}</h1>
        <h1 className="p-3 font-semibold text-base lg:text-xl text-center">{attendace.end}</h1>
        <h1 className="p-3 font-semibold text-base lg:text-xl text-center">{attendace.rows}</h1>
        <h1 className="p-3 font-semibold text-base lg:text-xl text-center">{created_at_format}</h1>
      </Link>
      <button
        onClick={() => deleteAtt(attendace.id)}
        className="border border-red-500 bg-red-500 text-white rounded-md p-3  transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
      >
        delete
      </button>
    </div>
  );
};
export default Atttendance;
