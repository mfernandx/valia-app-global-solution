export interface CommunityPost {
    communityPostId: string;
    userId: string | null;
    authorName: string;
    category: number | string;
    title: string;
    content: string;
    isAnonymous: boolean;
    createdAt: string;
    updatedAt: string | null;
    version: number;
    commentCount: number;
    isOwner: boolean;
}

export interface CreateCommunityPostRequest {
    category: number;
    title: string;
    content: string;
    isAnonymous: boolean;
}

export type UpdateCommunityPostRequest = CreateCommunityPostRequest;

export interface CommunityComment {
    communityCommentId: string;
    communityPostId: string;
    userId: string | null;
    authorName: string;
    content: string;
    isAnonymous: boolean;
    createdAt: string;
    updatedAt: string | null;
    version: number;
    isOwner: boolean;
}

export interface CreateCommunityCommentRequest {
    communityPostId: string;
    content: string;
    isAnonymous: boolean;
}

export interface UpdateCommunityCommentRequest {
    content: string;
}