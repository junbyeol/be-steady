/**
 * 타임존이 반영된 날짜 문자열 반환
 * @param offsetStr 타임존 오프셋 문자열 (예: '+09:00')
 * @param subtractDays 오늘 또는 어제 날짜를 계산할 때 빼야 하는 일수 (기본값: 0)
 * @returns 타임존이 반영된 날짜 문자열 (예: '2024-01-15')
 */
export const getTzDateString = (offsetStr: string, subtractDays = 0) => {
  const now = new Date();
  // 1. 서버의 현재 시간을 UTC(세계 표준시)로 변환
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;

  // 2. "+09:00" 같은 문자열에서 시, 분을 추출 (+인지 -인지도 판별)
  const offsetMatch = offsetStr.match(/([+-])(\d{2}):(\d{2})/);
  let offsetMs = 0;
  if (offsetMatch) {
    const sign = offsetMatch[1] === '+' ? 1 : -1;
    const hours = parseInt(offsetMatch[2]);
    const minutes = parseInt(offsetMatch[3]);
    offsetMs = sign * (hours * 3600000 + minutes * 60000);
  }

  // 3. UTC 시간에 사용자 타임존 오프셋을 더함 (그 지역의 실제 시간 계산)
  const tzDate = new Date(utc + offsetMs);

  // 4. 오늘(0)인지 어제(1)인지 날짜 조정
  tzDate.setDate(tzDate.getDate() - subtractDays);

  // 5. '2024-01-15T12:34:56.000Z' -> '2024-01-15' (날짜만 추출)
  return tzDate.toISOString().split('T')[0];
};
