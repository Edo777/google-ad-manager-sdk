
---
`social_access_tokens` table structure.

| Field                       | Type         | Nullable | Default | Comment                                                                                            |
|-----------------------------|--------------|----------|---------|----------------------------------------------------------------------------------------------------|
| id                          | `BigInteger` | No       |         |                                                                                                    |
| user_id                     | `BigInteger` | No       |         | referenced with `'common_users'.'id'`                                                              |
| facebook_is_logged          | `Boolean`    | No       | false   |                                                                                                    |
| facebook_user_id            | `BigInteger` | Yes      |         |                                                                                                    |
| facebook_access_token       | `String`     | Yes      |         |                                                                                                    |
| facebook_access_expire      | `Integer`    | Yes      |         | seconds offset from `facebook_access_last_time`                                                    |
| facebook_access_last_time   | `DateTime`   | Yes      |         |                                                                                                    |
| linkedin_is_logged          | `Boolean`    | No       | false   | Automaitcally set false after 365 days started from `linkedin_login_last_time`, UI login required. |
| linkedin_user_id            | `String`     | Yes      |         |                                                                                                    |
| linkedin_access_token       | `String`     | Yes      |         |                                                                                                    |
| linkedin_access_expire      | `Integer`    | Yes      |         | seconds offset from `linkedin_access_last_time`                                                    |
| linkedin_access_last_time   | `DateTime`   | Yes      |         |                                                                                                    |
| linkedin_refresh_token      | `String`     | Yes      |         |                                                                                                    |
| linkedin_refresh_expire     | `Integer`    | Yes      |         | seconds offset from `linkedin_refresh_token`                                                       |
| linkedin_login_last_time    | `DateTime`   | Yes      |         |                                                                                                    |
| twitter_is_logged           | `Boolean`    | No       | false   |                                                                                                    |
| twitter_user_id             | `String`     | Yes      |         |                                                                                                    |
| twitter_user_screen_name    | `String`     | Yes      |         |                                                                                                    |
| twitter_access_token        | `String`     | Yes      |         |                                                                                                    |
| twitter_access_token_secret | `String`     | Yes      |         |                                                                                                    |

_(need to add more fields SocialMedia based)_


---
`social_campains` table structure.

| Field                | Type         | Nullable | Default | Comment                                                                                                                                                                                                                               |
|----------------------|--------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id                   | `BigInteger` | No       |         |                                                                                                                                                                                                                                       |
| user_id              | `BigInteger` | No       |         | referenced with `'common_users'.'id'`                                                                                                                                                                                                 |
| name                 | `String`     | No       |         |                                                                                                                                                                                                                                       |
| objective            | `Enum`       | No       |         | Enum of ('brand_awareness', 'traffic', 'app_install', 'video_view', 'lead_generation', 'message', 'website_visits', 'conversion', 'engagement', 'catalog_sales', 'job_application', 'followers', 'preroll_views', 'app_reengagement') |
| status               | `Enum`       | No       | active  | Enum of ('active', 'paused', 'deleted', 'archived')                                                                                                                                                                                   |
| start_date           | `DateTime`   | No       |         |                                                                                                                                                                                                                                       |
| end_date             | `DateTime`   | Yes      |         |                                                                                                                                                                                                                                       |
| budget_type          | `Enum`       | No       |         | Enum of ('daily', 'lifetime')                                                                                                                                                                                                         |
| budget_value         | `Double`     | No       |         |                                                                                                                                                                                                                                       |
| total_spent          | `Double`     | No       | 0.0     |                                                                                                                                                                                                                                       |
| impressions          | `Integer`    | No       | 0       |                                                                                                                                                                                                                                       |
| clicks               | `Integer`    | No       | 0       |                                                                                                                                                                                                                                       |
| cpm                  | `Double`     | No       | 0.0     |                                                                                                                                                                                                                                       |
| ctr                  | `Double`     | No       | 0.0     | Click to rate: 100% * (clicks / impressions)                                                                                                                                                                                          |
| facebook_campaign_id | `BigInteger` | Yes      |         |                                                                                                                                                                                                                                       |
| facebook_adset_id    | `BigInteger` | Yes      |         |                                                                                                                                                                                                                                       |
| linkedin_campaign_id | `BigInteger` | Yes      |         |                                                                                                                                                                                                                                       |

_(need to add more fields SocialMedia based)_


---
`social_campain_targetings` table structure.

| Field       | Type         | Nullable | Default | Comment                                   |
|-------------|--------------|----------|---------|-------------------------------------------|
| id          | `BigInteger` | No       |         |                                           |
| campaign_id | `BigInteger` | No       |         | referenced with `'social_campaigns'.'id'` |
| data        | `String`     | No       |         | audience targeting json data              |


---
`social_local_ads` table structure.

| Field       | Type         | Nullable | Default | Comment                                   |
|-------------|--------------|----------|---------|-------------------------------------------|
| id          | `BigInteger` | No       |         |                                           |
| user_id     | `BigInteger` | No       |         | referenced with `'common_users'.'id'`     |
| campaign_id | `BigInteger` | No       |         | referenced with `'social_campaigns'.'id'` |
| name        | `String`     | No       |         |                                           |
| file_type   | `Enum`       | No       |         | Enum of ('image', 'video')                |
| file_size   | `Integer`    | No       |         | File size in bytes                        |
| file_name   | `String`     | No       |         | File original name.                       |
| file_path   | `String`     | No       |         | Saved file path.                          |


---
`social_remote_ads` table structure.

| Field              | Type         | Nullable | Default | Comment                                               |
|--------------------|--------------|----------|---------|-------------------------------------------------------|
| id                 | `BigInteger` | No       |         |                                                       |
| local_ad_id        | `BigInteger` | No       |         | referenced with `'social_ads'.'id'`                   |
| social_media       | `Enum`       | No       |         | Enum of ('facebook', 'linkedin', 'tiktok', 'twitter') |
| remote_ad_id       | `BigInteger` | No       |         | referenced with `'social_ads'.'id'`                   |
| page_id            | `BigInteger` | No       |         |                                                       |
| page_name          | `String`     | No       |         |                                                       |
| impressions        | `Integer`    | No       | 0       |                                                       |
| clicks             | `Integer`    | No       | 0       |                                                       |
| cpm                | `Double`     | No       | 0.0     |                                                       |
| ctr                | `Double`     | No       | 0.0     | Click to rate: 100% * (clicks / impressions)          |
| cpc                | `Double`     | No       | 0.0     | Cost per click                                        |


---
`social_saved_audiences` table structure.

| Field       | Type         | Nullable | Default | Comment                                               |
|-------------|--------------|----------|---------|-------------------------------------------------------|
| id          | `BigInteger` | No       |         |                                                       |
| user_id     | `BigInteger` | No       |         | referenced with `'common_users'.'id'`                 |
| name        | `String`     | No       |         |                                                       |
| data        | `String`     | No       |         | audience json data                                    |

