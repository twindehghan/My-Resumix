import { supabase } from './supabaseClient';
import { DocumentData } from '../types';

type DocumentType = 'resumes' | 'cover_letters';

/**
 * Creates a new blank document (resume or cover letter) for a user.
 */
export const createDocument = async (userId: string, type: DocumentType) => {
    const defaultData = type === 'resumes' 
        ? { personalDetails: { fullName: 'New Resume' } } 
        : { content: '' };

    const { data, error } = await supabase
        .from(type)
        .insert({ 
            user_id: userId,
            title: type === 'resumes' ? 'Untitled Resume' : 'Untitled Cover Letter',
            image_url: 'https://i.imgur.com/O2yP25T.png', // Default placeholder
            document_data: defaultData,
        })
        .select('id')
        .single();

    if (error) {
        console.error(`Error creating ${type}:`, error);
        throw error;
    }
    return data;
};

/**
 * Fetches all documents of a certain type for a specific user.
 */
export const getUserDocuments = async (userId: string, type: DocumentType) => {
    const { data, error } = await supabase
        .from(type)
        .select('id, title, image_url, last_updated')
        .eq('user_id', userId)
        .eq('is_sample', false)
        .order('last_updated', { ascending: false });

    if (error) {
        console.error(`Error fetching user ${type}:`, error);
        throw error;
    }
    return data;
};

/**
 * Fetches all sample documents of a certain type.
 */
export const getSampleDocuments = async (type: DocumentType) => {
    const { data, error } = await supabase
        .from(type)
        .select('id, title_key, image_url, is_locked, sample_users_count')
        .eq('is_sample', true)
        .order('created_at', { ascending: true });

    if (error) {
        console.error(`Error fetching sample ${type}:`, error);
        throw error;
    }
    return data;
};

/**
 * Fetches a single document by its ID.
 */
export const getDocument = async (id: string, type: DocumentType) => {
    const { data, error } = await supabase
        .from(type)
        .select('*, user_id')
        .eq('id', id)
        .single();
    
    if (error) {
        console.error(`Error fetching document ${id}:`, error);
        throw error;
    }
    return data;
};

/**
 * Updates a document's data.
 */
export const updateDocument = async (id: string, type: DocumentType, document_data: DocumentData, title?: string) => {
    const { data, error } = await supabase
        .from(type)
        .update({ document_data, title, last_updated: new Date().toISOString() })
        .eq('id', id);

    if (error) {
        console.error(`Error updating document ${id}:`, error);
        throw error;
    }
    return data;
};
