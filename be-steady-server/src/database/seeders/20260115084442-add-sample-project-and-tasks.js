'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const projectId = '000000';

    // 1. 프로젝트 생성
    await queryInterface.bulkInsert('projects', [
      {
        id: projectId,
        title: '나만의 프로젝트',
        created_at: new Date(), // createdAt -> created_at
        updated_at: new Date(), // updatedAt -> updated_at
      },
    ]);

    const selectedDays = [
      '2025-12-03',
      '2025-12-04',
      '2025-12-05',
      '2025-12-06',
      '2025-12-07',
      '2025-12-14',
      '2025-12-15',
      '2025-12-16',
      '2025-12-17',
      '2025-12-18',
      '2025-12-20',
      '2025-12-21',
      '2025-12-22',
      '2025-12-26',
      '2026-01-02',
      '2026-01-03',
      '2026-01-04',
      '2026-01-05',
      '2026-01-06',
      new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0], //어제날짜
      new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0], //어제날짜
      new Date().toISOString().split('T')[0], //오늘 날짜
    ];

    // 2. 태스크 데이터 매핑 (로직 오류 수정)
    const tasks = selectedDays.map(dateStr => {
      const taskDate = new Date(dateStr);
      taskDate.setHours(12, 0, 0); // 낮 12시로 고정

      return {
        datetime: taskDate,
        project_id: projectId, // projectId -> project_id
        created_at: new Date(), // createdAt -> created_at
        updated_at: new Date(), // updatedAt -> updated_at
      };
    });

    // 3. 태스크 삽입
    await queryInterface.bulkInsert('tasks', tasks);
  },

  down: async (queryInterface, Sequelize) => {
    // 생성한 데이터 삭제 (필드명 맞춰서 삭제)
    await queryInterface.bulkDelete('tasks', { project_id: '000000' }, {});
    await queryInterface.bulkDelete('projects', { id: '000000' }, {});
  },
};
