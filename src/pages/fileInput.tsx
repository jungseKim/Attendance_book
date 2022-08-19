import * as XLSX from 'xlsx';
import { addPost } from '../api';
import { timeFomat } from '../components/attendances';
import { Iattendance } from '../types/Iattendance';
import { IfileFomat } from '../types/IfileFormat';
import { fileFomat } from './main';
export default function FileInput({
  setNewFile,
}: {
  setNewFile: React.Dispatch<React.SetStateAction<fileFomat | null>>;
}) {
  function readExcel(e: React.ChangeEvent<HTMLInputElement>) {
    let input = e.target;
    let reader = new FileReader();
    if (input.files) reader.readAsBinaryString(input.files[0]);
    reader.onload = function () {
      let data = reader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      workBook.SheetNames.forEach(function (sheetName) {
        console.log('SheetName: ' + sheetName);
        let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], {
          raw: false,
          dateNF: 'yyyy"."mm"."dd',
        }) as IfileFomat[];
        // console.log(JSON.stringify(rows));
        // addPost(JSON.stringify(rows));
        //파일 타입 만들기

        setNewFile({ file: rows, rows: rows.length });
        // setNewFile("Dd");
      });
    };
  }
  return (
    <div className="w-full">
      <label>
        <input onChange={readExcel} className="text-sm   hidden" type="file" multiple />
        <div
          style={{ backgroundColor: '#FEE2CB' }}
          className="cursor-pointer  text-center w-full  sm:w-auto px-9 py-4 mb-4 
            text-base lg:text-2xl font-semibold rounded-xl border-pink-200 focus:ring-gray-900 text-purple-700"
        >
          New
        </div>
      </label>
      {/* <input type="file" onChange={readExcel}></input> */}
    </div>
  );
}
