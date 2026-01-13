import { useState } from 'react'
import viteLogo from '../../assets/saitama.png'
import { VerticalCalendar } from '../../components/VerticalCalendar'
import { IoSettingsOutline } from 'react-icons/io5'
import SettingModal from './SettingModal'

const ProjectPage = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  
    const handleToggleSettings = () => {
      setIsSettingsOpen((prev) => !prev)
    }
  
    return (
      <div className="flex flex-col w-1/2 h-full">
        {/* header 뷰 */}
        <header className="w-full h-16 flex justify-end items-center relative px-4">
          <button
            type="button"
            className="p-0 cursor-pointer group"
            onClick={handleToggleSettings}
            aria-label="설정"
            tabIndex={0}
          >
            <IoSettingsOutline 
              size={24} 
              className="text-gray-400 transition-colors duration-200 group-hover:text-gray-800" 
            />
          </button>
  
          {isSettingsOpen && (
            <SettingModal />
          )}
        </header>
  
        {/* title 뷰 */}
        <div className="flex relative h-24">
          <h1 className="text-4xl font-bold self-start">준성타마<br/>프로젝트</h1>
          <img src={viteLogo} className="absolute bottom-0 right-1/2 w-32 h-32 -z-10" alt="React logo" />        
          <div className="flex flex-row flex-1 justify-end gap-4 self-end">
            <StatisticCard title="전체 운동횟수" value={100} />
            <StatisticCard title="연속 운동횟수" value={23} />
          </div>
        </div>
        {/* task 뷰 */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full max-w-lg h-full max-h-[800px]">
            <VerticalCalendar tasks={[{ year: 2026, month: 0, day: 1, projectId: "1" }]} onPressDay={() => {}} />
          </div>
        </div>
      </div>
    )
  }
  
  interface StatisticCardProps {
    title: string;
    value: number;
  }
  
  const StatisticCard = ({ title, value }: StatisticCardProps) => {
    return (
      <div className="flex flex-col items-center justify-center bg-white h-16 w-32 rounded-lg border-gray-300 border-2">
        <h6>{title}</h6>
        <p>{value}<span>일</span></p>
      </div>
    )
  }

export default ProjectPage