/**
 * HMH Media Tool - Netlify Function
 * Generates images using Replicate API
 *
 * [1 = -1]
 */

const STYLE_PRESETS = {
    "epoch": {
        suffix: "minimalist scientific illustration, dark background #0a0a0f, " +
                "gold accent #c9a227, blue accent #7ab8d4, clean geometric lines, " +
                "mathematical precision, documentary style, high contrast"
    },
    "epoch-dark": {
        suffix: "deep space black background, single gold geometric element, " +
                "minimal composition, mathematical purity, stark contrast, " +
                "no gradients, precise lines only"
    },
    "geometric": {
        suffix: "sacred geometry, mathematical precision, tetrahelix structure, " +
                "golden ratio proportions, clean lines on dark background, " +
                "technical illustration, blueprint aesthetic"
    },
    "electromagnetic": {
        suffix: "electromagnetic field visualization, physics illustration, " +
                "wave patterns, field lines, dark background, cyan and gold accents, " +
                "scientific diagram, high contrast, educational"
    },
    "maxwell": {
        suffix: "19th century scientific illustration style, electromagnetic theory, " +
                "quaternion mathematics, Victorian physics aesthetic, " +
                "dark background with gold and blue accents, technical precision"
    },
    "raw": {
        suffix: ""
    }
};

exports.handler = async (event, context) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Check API key
    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'REPLICATE_API_TOKEN not configured' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { prompt, style = 'epoch', aspect_ratio = '16:9' } = body;

        if (!prompt) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Prompt is required' })
            };
        }

        // Build full prompt with style
        const styleInfo = STYLE_PRESETS[style] || STYLE_PRESETS['epoch'];
        const fullPrompt = styleInfo.suffix ? `${prompt}, ${styleInfo.suffix}` : prompt;

        console.log('Generating image with prompt:', fullPrompt.substring(0, 100) + '...');

        // Call Replicate API - FLUX Dev model
        const response = await fetch('https://api.replicate.com/v1/predictions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                version: "black-forest-labs/flux-dev",
                input: {
                    prompt: fullPrompt,
                    aspect_ratio: aspect_ratio,
                    output_format: "png",
                    output_quality: 90,
                    safety_tolerance: 5
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Replicate API error:', errorText);
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error: 'Replicate API error', details: errorText })
            };
        }

        const prediction = await response.json();

        // Poll for completion
        let result = prediction;
        let attempts = 0;
        const maxAttempts = 60; // 60 seconds max

        while (result.status !== 'succeeded' && result.status !== 'failed' && attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1000));

            const pollResponse = await fetch(result.urls.get, {
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                }
            });

            result = await pollResponse.json();
            attempts++;
        }

        if (result.status === 'failed') {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Generation failed', details: result.error })
            };
        }

        if (result.status !== 'succeeded') {
            return {
                statusCode: 504,
                headers,
                body: JSON.stringify({ error: 'Generation timed out' })
            };
        }

        // Return the image URL
        const imageUrl = Array.isArray(result.output) ? result.output[0] : result.output;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                imageUrl: imageUrl,
                prompt: prompt,
                style: style
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error', message: error.message })
        };
    }
};
