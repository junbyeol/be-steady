import { useMutation, useQuery } from "@tanstack/react-query";
import queryClient from "./queryClient";
import type { CreateProjectDto, Project } from "../interface/project";

export const projectKeys = {
  single: (id: string) => ["projects", id],
};

/**
 * Queries
 */
export const useProject = (projectId: string) => {
  return useQuery<Project, Error, Project, ReturnType<typeof projectKeys.single>>({
    queryKey: ["projects", projectId],
    queryFn: async ({ queryKey }) => {
      const [, projectId] = queryKey;
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects/${projectId}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
    enabled: !!projectId, // ID가 있을 때만 실행
  });
};

/**
 * Mutations
 */
export const useCreateProject = () => {
  return useMutation<Project, Error, CreateProjectDto, ReturnType<typeof projectKeys.single>>({
    // Mutation 함수: 업데이트할 데이터와 ID를 받습니다.
    mutationFn: async (dto) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dto),
        }
      );
      if (!response.ok) throw new Error("Failed to update project");
      return response.json();
    },
    // 성공 시 관련 쿼리를 무효화하여 화면을 최신 상태로 갱신합니다.
    onSuccess: (data) => {
      // 특정 프로젝트의 상세 정보 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: projectKeys.single(data.id),
      });
    },
  });
};
