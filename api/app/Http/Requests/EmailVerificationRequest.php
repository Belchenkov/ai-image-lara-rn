<?php

namespace App\Http\Requests;

use App\Models\User;
use \Illuminate\Foundation\Auth\EmailVerificationRequest as CoreRequest;
use Illuminate\Support\Collection;

class EmailVerificationRequest extends CoreRequest
{
    public function user($guard = null): Collection
    {
        return User::find($this->route('id'));
    }
}
