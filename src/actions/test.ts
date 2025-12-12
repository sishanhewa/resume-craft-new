"use server";

export async function testAction() {
    return { success: true, message: "Server Action is working!", timestamp: new Date().toISOString() };
}
