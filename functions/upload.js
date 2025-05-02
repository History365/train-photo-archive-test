export const onRequestPost = async ({ request, env }) => {
    const formData = await request.formData();
    const username = formData.get('username');
    const locomotive = formData.get('locomotive');
    const file = formData.get('photo');
  
    if (!username || !locomotive || !file) {
      return new Response("Missing fields", { status: 400 });
    }
  
    const arrayBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;
    const key = `photos/${fileName}`;
  
    // Upload to R2
    await env.R2_BUCKET.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type },
    });
  
    // Save to D1
    await env.DB.prepare(
      `INSERT INTO photos (username, locomotive, filename, timestamp)
       VALUES (?, ?, ?, datetime('now'))`
    ).bind(username, locomotive, key).run();
  
    return new Response("Photo uploaded successfully!");
  };
  