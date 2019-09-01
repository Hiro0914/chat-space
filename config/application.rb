require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
    end
    # 表示を日本時間に直す
    config.time_zone = 'Tokyo'
    # DBへの保存も日本時間とする
    config.active_record.default_timezone = :local
    config.i18n.default_locale = :ja
  end
end
