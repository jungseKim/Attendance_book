export interface IfileFomat {
  결과: string;
  기관명: string;
  날짜: string;
  생년월일: string;
  승인상태: string;
  연수기간: string;
  이름: string;
  입력방식: string;
  입실: string;
  진행상태: string;
  취업국가: string;
  퇴실: string;
  id: number | undefined;
}
export interface ItableArray {
  결과: string;
  날짜: string;
}

//여기서 time format 해주기
export interface Ifileshowformat {
  file: IfileFomat[];
  id: number;
}
