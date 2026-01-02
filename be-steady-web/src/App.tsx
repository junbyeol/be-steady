import viteLogo from '/vite.svg'
import { VerticalCalendar } from './component/vertical-calendar'

function App() {
  return (
    <div className="bg-blue-500 w-full h-full">
      {/* header 뷰 */}
      <div className="flex bg-red-500 relative h-24">
        <h1 className="text-4xl font-bold self-start">준성타마 프로젝트</h1>
        <img src={viteLogo} className="absolute bottom-0 right-1/2 w-32 h-32 z" alt="React logo" />        
        <div className="flex flex-row flex-1 justify-center gap-4 self-end">
          <StatisticCard />
          <StatisticCard />
        </div>
      
      </div>
      {/* task 뷰 */}
      <div className="flex-1 flex justify-center items-center bg-green-500">
        <div className="w-full max-w-lg h-full max-h-[800px]">
          <VerticalCalendar />
        </div>
      </div>
    </div>
  )
}

function StatisticCard() {
  return (
    <div className="flex flex-col items-center justify-center bg-white h-16 w-32 rounded-lg border-gray-300 border-2">
      <h6>전체 운동횟수</h6>
      <p>100<span>일</span></p>
    </div>
  )
}

export default App
