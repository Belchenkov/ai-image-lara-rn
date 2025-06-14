<?php

namespace App\Http\Controllers;

use App\Enums\OperationEnum;
use Cloudinary\Api\Exception\ApiError;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Transformation\AspectRatio;
use Cloudinary\Transformation\Background;
use Cloudinary\Transformation\Resize;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Cloudinary\Asset\Image as CloudinaryImage;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    /**
     * @throws ApiError
     */
    public function fill(Request $request): JsonResponse
    {
        $request->validate([
            'image' => 'required|image|max:10240',
            'aspectRation' => 'required|string',
        ]);

        $image = $request->file('image');
        $aspectRation = $request->input('aspectRation');
        $operation = OperationEnum::GENERATIVE_FILL;

        $this->checkCredits($operation);

        $aspectRatioMethod = $this->getAspectRationMethod($aspectRation);

        $originalPublicId = $image->store('uploads');

        $imageSize = getimagesize($image);
        $originalWidth = $imageSize[0];
        $originalHeight = $imageSize[1];

        $pad = Resize::pad();

        if (in_array($aspectRation, ['16:9', '4:3'])) {
            $pad->height($originalHeight);
        } else {
            $pad->width($originalWidth);
        }

        $generatedImg = (new CloudinaryImage($originalPublicId))->resize(
            $pad
                ->aspectRatio(AspectRatio::{$aspectRatioMethod()})
                ->background(Background::generativeFill()),
        );

        $transformedImageUrl = $generatedImg->toUrl();

        $uploadResult = (new UploadApi())->upload($transformedImageUrl, [
            'folder' => 'transformed/gen_fill',
        ]);

        $uploadedImageUrl = $uploadResult['secure_url'];
        $transformedPublicId = 'uploads/' . $uploadResult['public_id'];

        $this->saveImageOperation(
            $originalPublicId,
            Storage::url($originalPublicId),
            $transformedImageUrl,
            $uploadedImageUrl,
            OperationEnum::GENERATIVE_FILL->value,
            ['aspect_ratio' => $aspectRation]
        );

        $this->deductCredits($operation);

        return response()->json([
            'message' => 'Image uploaded and transformed successfully',
            'transformed_url' => $transformedPublicId,
            'credits' => request()->user()->credits,
        ]);
    }
}
