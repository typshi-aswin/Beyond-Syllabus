import { useQuery } from "@tanstack/react-query";

const useGetDirectoryStructure = () => {
    return useQuery({
        queryKey: ["directoryStructure"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/universities`,
                { cache: "no-store", }
            );
            if (!res.ok) {
                throw new Error("Failed to fetch directory structure");
            }
            return await res.json() as Record<string, any>;
        },
    });
}

export {
    useGetDirectoryStructure
}